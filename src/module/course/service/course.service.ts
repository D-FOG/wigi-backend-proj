import { Course } from "../model/course.model";
import { Topic } from "../model/topic.model";
import { ApiError } from "../../../utils/apiError";
import { Enrollment } from "../model/enrollment.model";
import { issueCertificateService } from "../../certificate/service/certificate.service";

//Browse all courses
export const browseCourses = async () => {
  return Course.find({ isPublished: true })
    .select("title description thumbnail totalModules totalTopics")
    .sort({ createdAt: -1 });
};


//View a single course by ID
export const getCoursePreview = async (courseId: string) => {
  const course = await Course.findById(courseId)
    .populate({
      path: "modules",
      select: "title topics",
      populate: {
        path: "topics",
        select: "title",
      },
    });

  if (!course) throw new ApiError(404, "Course not found");
  return course;
};


//Enroll user in a course
export const enrollCourse = async (userId: string, courseId: string) => {
  const existing = await Enrollment.findOne({ userId, courseId });
  if (existing) throw new ApiError(400, "Already enrolled");

  const enrollment = await Enrollment.create({
    userId,
    courseId,
  });

  return enrollment;
};

//Get My courses with PDFs
export const getMyCourse = async (userId: string, courseId: string) => {
  const enrollment = await Enrollment.findOne({ userId, courseId });
  if (!enrollment) throw new ApiError(403, "Not enrolled");

  const course = await Course.findById(courseId)
    .populate({
      path: "modules",
      populate: {
        path: "topics",
        select: "title materialUrl", // Cloudinary PDF URL
      },
    });

  return {
    course,
    progress: enrollment.progress,
    status: enrollment.status,
  };
};

//Track User Progess
export const completeTopic = async (
  userId: string,
  courseId: string,
  topicId: string
) => {
  const enrollment = await Enrollment.findOne({ userId, courseId });
  if (!enrollment) throw new ApiError(403, "Not enrolled");

  const alreadyCompleted = enrollment.completedTopics.some(
    (t) => t.topicId.toString() === topicId
  );
  if (alreadyCompleted) return enrollment;

  enrollment.completedTopics.push({ topicId });
    
  const totalTopics = await Topic.countDocuments({ courseId });

  // Calculate progress
  const course = await Course.findById(courseId).populate("modules topics");
  //const totalTopics = course!.totalTopics;

  enrollment.progress = Math.round(
    (enrollment.completedTopics.length / totalTopics) * 100
  );

  if (enrollment.progress === 100) {
    enrollment.status = "completed";
    await issueCertificateService(userId, courseId); //update here incase it fails or doesn't suit logic
  }

  await enrollment.save();
  return enrollment;
};

//Dashboard - My Courses May implement later
export const getMyCourses = async (userId: string) => {
  const enrollments = await Enrollment.find({ userId })
    .populate("courseId", "title thumbnail");

  return {
    inProgress: enrollments.filter(e => e.status === "in_progress"),
    completed: enrollments.filter(e => e.status === "completed"),
  };
};


