import { Request, Response } from "express";
import { browseCourses, getCoursePreview, enrollCourse, getMyCourse, completeTopic, getMyCourses } from "../service/course.service";
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