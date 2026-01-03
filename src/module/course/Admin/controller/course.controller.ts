import { Request, Response } from "express";
import { createCourse, updateCourseService, deleteCourseService } from "../service/course.service";
import { createModule, updateModuleService, deleteModuleService } from "../service/module.service";
import { createTopic, updateTopicService, deleteTopicService } from "../service/topic.service";
import { apiResponse } from "../../../../utils/apiResponse";
import { AuthRequest } from "../../../../middlewares/auth.middleware";

export const adminCreateCourse = async (req: AuthRequest, res: Response) => {
  const { title, description } = req.body;

  const course = await createCourse(
    title,
    description,
    req.user!.id
  );

  return apiResponse(res, 201, "Course created successfully", course);
};

export const adminCreateModule = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const { title, order } = req.body;

  const module = await createModule(courseId, title, order);
  return apiResponse(res, 201, "Module created successfully", module);
};

export const adminCreateTopic = async (req: Request, res: Response) => {
  const { moduleId } = req.params;
  const { title, order } = req.body;

  const topic = await createTopic(
    moduleId,
    title,
    req.file,
    order
  );

  return apiResponse(res, 201, "Topic created successfully", topic);
};

export const updateCourse = async (req: Request, res: Response) => {
  const course = await updateCourseService(
    req.params.courseId,
    req.body
  );
  return apiResponse(res, 200, "Course updated successfully", course);
};

export const deleteCourse = async (req: Request, res: Response) => {
  await deleteCourseService(req.params.courseId);
  return apiResponse(res, 200, "Course deleted successfully");
};

export const updateModule = async (req: Request, res: Response) => {
  const module = await updateModuleService(
    req.params.moduleId,
    req.body
  );
  return apiResponse(res, 200, "Module updated successfully", module);
};

export const deleteModule = async (req: Request, res: Response) => {
  await deleteModuleService(req.params.moduleId);
  return apiResponse(res, 200, "Module deleted successfully");
};

export const updateTopic = async (req: Request, res: Response) => {
  const topic = await updateTopicService(
    req.params.topicId,
    req.body
  );
  return apiResponse(res, 200, "Topic updated successfully", topic);
};

export const deleteTopic = async (req: Request, res: Response) => {
  await deleteTopicService(req.params.topicId);
  return apiResponse(res, 200, "Topic deleted successfully");
};
