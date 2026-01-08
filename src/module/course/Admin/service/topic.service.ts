import cloudinary from "../../../../config/cloudinary";
import { Topic } from "../../model/topic.model";
import { CourseModule } from "../../model/module.model";
import { ApiError } from "../../../../utils/apiError";

export const createTopic = async (
  moduleId: string,
  title: string,
  file: Express.Multer.File,
  order?: number
) => {
  if (!file) {
    throw new ApiError(400, "Material file is required");
  }

  const module = await CourseModule.findById(moduleId);
  if (!module) throw new ApiError(404, "Module not found");

  const isPdf = file.mimetype === "application/pdf";
  const isImage = file.mimetype.startsWith("image/");

  if (!isPdf && !isImage) {
    throw new ApiError(400, "Only PDF or image files are allowed");
  }

  const uploadResult = await cloudinary.uploader.upload(
    `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
    {
      folder: "course-materials",
      resource_type: isPdf ? "raw" : "image",
    }
  );

  const topic = await Topic.create({
    moduleId,
    title,
    materials: [
      {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        type: isPdf ? "pdf" : "image",
      },
    ],
    order: order ?? 0,
  });

  return topic;
};


export const updateTopicService = async (
  topicId: string,
  payload: Partial<{ title: string; materialUrl: string }>
) => {
  const topic = await Topic.findByIdAndUpdate(topicId, payload, {
    new: true,
  });

  if (!topic) throw new ApiError(404, "Topic not found");
  return topic;
};

export const updateTopicMaterialService = async (
  topicId: string,
  file: Express.Multer.File
) => {
  if (!file) {
    throw new ApiError(400, "Material file is required");
  }

  const topic = await Topic.findById(topicId);
  if (!topic) throw new ApiError(404, "Topic not found");

  // 1. Delete old material
  // await cloudinary.uploader.destroy(topic.materials[0].publicId, {
  //   resource_type: topic.materials[0].type === "pdf" ? "raw" : "image",
  // });
  if (topic.materials?.length) {
    for (const material of topic.materials) {
      await cloudinary.uploader.destroy(material.publicId, {
        resource_type: material.type === "pdf" ? "raw" : "image",
      });
    }
  }

  // 2. Upload new material
  const materialType =
    file.mimetype === "application/pdf" ? "pdf" : "image";

  const uploadResult = await cloudinary.uploader.upload(
    `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
    {
      folder: "course-materials",
      resource_type: materialType === "pdf" ? "raw" : "image",
    }
  );

  // 3. Update topic
  topic.materials = [
    {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      type: materialType,
    },
  ];
  await topic.save();
  return topic;
};


export const deleteTopicService = async (topicId: string) => {
  const topic = await Topic.findById(topicId);
  if (!topic) throw new ApiError(404, "Topic not found");

  // Delete material from Cloudinary
  // await cloudinary.uploader.destroy(topic.materials[0].publicId, {
  //   resource_type: topic.materials[0].type === "pdf" ? "raw" : "image",
  // });
  if (topic.materials?.length) {
    for (const material of topic.materials) {
      await cloudinary.uploader.destroy(material.publicId, {
        resource_type: material.type === "pdf" ? "raw" : "image",
      });
    }
  }

  await topic.deleteOne();
};

//Get topics of a module by module ID
export const getModuleTopicsService = async (moduleId: string) => {
  return Topic.find({ moduleId })
    .select("_id title order materials.type materials.url")
    .sort({ order: 1 });
};

