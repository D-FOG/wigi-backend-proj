import cloudinary from "../../../../config/cloudinary";
import { Topic } from "../../model/topic.model";
import { CourseModule } from "../../model/module.model";
import { ApiError } from "../../../../utils/apiError";

export const createTopic = async (
  moduleId: string,
  title: string,
  file?: Express.Multer.File,
  order?: number
) => {
  if (!file) {
    throw new ApiError(400, "PDF material is required");
  }

  const module = await CourseModule.findById(moduleId);
  if (!module) throw new ApiError(404, "Module not found");

  const uploadResult = await cloudinary.uploader.upload(
    `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
    {
      folder: "course-materials",
      resource_type: "raw", // IMPORTANT for PDFs
    }
  );

  const topic = await Topic.create({
    moduleId,
    title,
    materialUrl: uploadResult.secure_url,
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

export const deleteTopicService = async (topicId: string) => {
  const topic = await Topic.findById(topicId);
  if (!topic) throw new ApiError(404, "Topic not found");

  await topic.deleteOne();
};
