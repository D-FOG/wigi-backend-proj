import { Course } from "../../model/course.model";
import { CourseModule } from "../../model/module.model";
import { Topic } from "../../model/topic.model";
import { Enrollment } from "../../model/enrollment.model";
import { ApiError } from "../../../../utils/apiError";

//Admin creates a new course
export const createCourse = async (
  title: string,
  description: string | undefined,
  track: string,
  adminId: string
) => {
  const course = await Course.create({
    title,
    description,
    track,
    createdBy: adminId,
    isPublished: true,
  });

  return course;
};

//Admin updates an existing course  
export const updateCourseService = async (
  courseId: string,
  payload: Partial<{ title: string; description: string; isPublished: boolean }>
) => {
  const course = await Course.findByIdAndUpdate(courseId, payload, {
    new: true,
  });

  if (!course) throw new ApiError(404, "Course not found");
  return course;
};

//admin deletes a course
export const deleteCourseService = async (courseId: string) => {
  const course = await Course.findById(courseId);
  if (!course) throw new ApiError(404, "Course not found");

  await CourseModule.deleteMany({ courseId });
  await Topic.deleteMany({ courseId });
  await Enrollment.deleteMany({ courseId });
  await course.deleteOne();
};

// Get all courses for admin
export const getAdminCoursesService = async () => {
  return Course.find().sort({ createdAt: -1 });
};
