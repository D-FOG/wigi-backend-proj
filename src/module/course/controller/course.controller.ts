import { Request, Response } from "express";
import { browseCourses, getCoursePreview, enrollCourse, getMyCourse, completeTopic, getMyCourses, getCourseModulesService, getModuleTopicsService, getUserCoursesService, getUserCourseTimelineService } from "../service/course.service";
import { apiResponse } from "../../../utils/apiResponse";
import { AuthRequest } from "../../../middlewares/auth.middleware";

//Browse all courses
export const getCourses = async (req: Request, res: Response) => {
  const courses = await browseCourses();
  return apiResponse(res, 200, "Courses fetched", courses);
};

//View a single course by ID
export const getCourse = async (req: Request, res: Response) => {
  const course = await getCoursePreview(req.params.courseId);
  return apiResponse(res, 200, "Course fetched", course);
};

//Enroll user in a course
export const enroll = async (req: AuthRequest, res: Response) => {
  const enrollment = await enrollCourse(req.user!.id, req.params.courseId);
  return apiResponse(res, 201, "Enrolled successfully", enrollment);
};

//Get My courses 
export const getMyCourseDetails = async (req: AuthRequest, res: Response) => {
  const myCourse = await getMyCourse(req.user!.id, req.params.courseId);
  return apiResponse(res, 200, "My Course fetched", myCourse);
}

//track topic completion
export const trackCompleteTopic = async (req: AuthRequest, res: Response) => {
  const enrollment = await completeTopic(
    req.user!.id,
    req.params.courseId,
    req.params.topicId
  );
  return apiResponse(res, 200, "Topic completed", enrollment);
};


//Get My courses list
export const getMyCoursesList = async (req: AuthRequest, res: Response) => {
  const myCourses = await getMyCourses(req.user!.id);
  return apiResponse(res, 200, "My Courses fetched", myCourses);
};

//Get all courses of a user based on course chosen on registration
export const getUserCourses = async (req: AuthRequest, res: Response) => {
  const courses = await getUserCoursesService(req.user!.id);
  return apiResponse(res, 200, "User courses fetched", courses);
};

//Get modules of a course by course ID
export const getCourseModules = async (req: AuthRequest, res: Response) => {
  const modules = await getCourseModulesService(req.params.courseId, req.user!.id);
  //console.log('Modules fetched:', modules);
  return apiResponse(res, 200, "Modules fetched successfully", modules);
};

//Get topics of a module by module ID
export const getModuleTopics = async (req: Request, res: Response) => {
  const topics = await getModuleTopicsService(req.params.moduleId);
  return apiResponse(res, 200, "Topics fetched successfully", topics);
};

//Get user course timeline with module and topic statuses
export const getUserCourseTimeline = async (req: AuthRequest, res: Response) => {
  const timeline = await getUserCourseTimelineService(req.user!.id);
  return apiResponse(res, 200, "User course timeline fetched", timeline);
};