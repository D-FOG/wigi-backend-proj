import { CourseModule } from "../../model/module.model";
import { Course } from "../../model/course.model";
import { Topic } from "../../model/topic.model";
import { ApiError } from "../../../../utils/apiError";

export const createModule = async (
  courseId: string,
  title: string,
  order?: number
) => {
  const course = await Course.findById(courseId);
  if (!course) throw new ApiError(404, "Course not found");

  const module = await CourseModule.create({
    courseId,
    title,
    order: order ?? 0,
  });

  return module;
};

export const updateModuleService = async (
  moduleId: string,
  payload: Partial<{ title: string; order: number }>
) => {
  const module = await CourseModule.findByIdAndUpdate(moduleId, payload, {
    new: true,
  });

  if (!module) throw new ApiError(404, "Module not found");
  return module;
};

export const deleteModuleService = async (moduleId: string) => {
  const module = await CourseModule.findById(moduleId);
  if (!module) throw new ApiError(404, "Module not found");

  await Topic.deleteMany({ moduleId });
  await module.deleteOne();
};

//Get modules of a course by course ID
export const getCourseModulesService = async (courseId: string) => {
  return CourseModule.find({ courseId })
    .select("_id title order")
    .sort({ order: 1 });
};

