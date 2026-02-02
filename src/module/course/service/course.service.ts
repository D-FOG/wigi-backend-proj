import { User } from "../../user/model/user.model";
import { Course } from "../model/course.model";
import { CourseModule } from "../model/module.model";
import { Quiz } from "../../quiz/model/quiz.model"
import { Topic } from "../model/topic.model";
import { ApiError } from "../../../utils/apiError";
import { Enrollment } from "../model/enrollment.model";
import { issueCertificateService } from "../../certificate/service/certificate.service";

//Browse all courses
export const browseCourses = async () => {
  return Course.find({ isPublished: true })
    .select("title description track thumbnail totalModules totalTopics")
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

//Get courses based on user's enrolled courses on registration
export const getUserCoursesService = async (userId: string) => {
  const user = await User.findById(userId).select("course");
  if (!user) throw new ApiError(404, "User not found");

  return Course.find({
    track: user.course,
    isPublished: true,
  }).sort({ createdAt: -1 });
};

//Get modules of a course by course ID
export const getCourseModulesService = async (courseId: string) => {
  const course = await Course.findById(courseId).select("createdAt");
  if (!course) throw new ApiError(404, "Course not found");

  const modules = await CourseModule.find({ courseId })
    .select("_id title order durationInDays")
    .sort({ order: 1 })
    .lean();

  if (!modules.length) return [];

  // ✅ Fetch all quizzes for these modules (ONE QUERY)
  const moduleIds = modules.map((m) => m._id);
  const quizzes = await Quiz.find({ moduleId: { $in: moduleIds } })
    .select("_id moduleId")
    .lean();

  const quizMap = new Map(
    quizzes.map((quiz) => [quiz.moduleId.toString(), quiz])
  );

  const now = new Date();
  const courseStart = new Date(course.createdAt);

  const daysSinceStart = Math.floor(
    (now.getTime() - courseStart.getTime()) / (1000 * 60 * 60 * 24)
  );

  const activeOrder = daysSinceStart + 1;

  return modules.map((module) => {
    let status: "completed" | "active" | "upcoming";

    if (module.order < activeOrder) status = "completed";
    else if (module.order === activeOrder) status = "active";
    else status = "upcoming";

    // ---- Availability Logic (9pm → 7pm) ----
    let isContentAvailable = false;
    let isQuizAvailable = false;
    let availabilityWindow: { startsAt: Date; endsAt: Date } | null = null;
    let quizId: string | null = null;

    const quiz = quizMap.get(module._id.toString());

    if (status === "active") {
      const start = new Date();
      start.setHours(21, 0, 0, 0); // 9 PM today

      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      end.setHours(19, 0, 0, 0); // 7 PM next day

      availabilityWindow = { startsAt: start, endsAt: end };

      if (now >= start && now <= end) {
        isContentAvailable = true;
        isQuizAvailable = Boolean(quiz);
        quizId = quiz ? quiz._id.toString() : null;
      }
    }

    return {
      ...module,
      status,
      hasQuiz: Boolean(quiz),
      quizId,
      isContentAvailable,
      isQuizAvailable,
      availabilityWindow,
    };
  });
};

// export const getCourseModulesService = async (courseId: string) => {
//   const course = await Course.findById(courseId).select("createdAt");
//   if (!course) throw new ApiError(404, "Course not found");

//   const modules = await CourseModule.find({ courseId })
//     .select("_id title order durationInDays")
//     .sort({ order: 1 })
//     .lean();

//   if (!modules.length) return [];

//   const now = new Date();
//   const courseStart = new Date(course.createdAt);

//   const daysSinceStart = Math.floor(
//     (now.getTime() - courseStart.getTime()) / (1000 * 60 * 60 * 24)
//   );

//   const activeOrder = daysSinceStart + 1;

//   return modules.map((module) => {
//     let status: "completed" | "active" | "upcoming";

//     if (module.order < activeOrder) status = "completed";
//     else if (module.order === activeOrder) status = "active";
//     else status = "upcoming";

//     // ---- Availability Logic (9pm → 7pm) ----
//     let isContentAvailable = false;
//     let isQuizAvailable = false;
//     let availabilityWindow: { startsAt: Date; endsAt: Date } | null = null;

//     if (status === "active") {
//       const start = new Date();
//       start.setHours(21, 0, 0, 0); // 9:00 PM today

//       const end = new Date(start);
//       end.setDate(end.getDate() + 1);
//       end.setHours(19, 0, 0, 0); // 7:00 PM next day

//       availabilityWindow = { startsAt: start, endsAt: end };

//       if (now >= start && now <= end) {
//         isContentAvailable = true;
//         isQuizAvailable = true;
//       }
//     }

//     return {
//       ...module,
//       status,
//       isContentAvailable,
//       isQuizAvailable,
//       availabilityWindow,
//     };
//   });
// };

// export const getCourseModulesService = async (courseId: string) => {
//   const course = await Course.findById(courseId).select("createdAt");
//   if (!course) throw new ApiError(404, "Course not found");

//   const modules = await CourseModule.find({ courseId })
//     .select("_id title order durationInDays")
//     .sort({ order: 1 })
//     .lean();

//   if (!modules.length) return [];

//   const now = new Date();
//   const courseStart = new Date(course.createdAt);

//   // Days since course started (midnight-safe)
//   const daysSinceStart = Math.floor(
//     (now.getTime() - courseStart.getTime()) / (1000 * 60 * 60 * 24)
//   );

//   const activeOrder = daysSinceStart + 1;

//   return modules.map((module) => {
//     let status: "completed" | "active" | "upcoming";

//     if (module.order < activeOrder) status = "completed";
//     else if (module.order === activeOrder) status = "active";
//     else status = "upcoming";

//     return {
//       ...module,
//       status,
//     };
//   });
// };


//Get topics of a module by module ID
export const getModuleTopicsService = async (moduleId: string) => {
  return Topic.find({ moduleId })
    .select("_id title order materials.type materials.url")
    .sort({ order: 1 });
};

//Get user course timeline with module and topic statuses
export const getUserCourseTimelineService = async (userId: string) => {
  const enrollment = await Enrollment.findOne({ userId }).lean();
  if (!enrollment) throw new ApiError(404, "User not enrolled");

  console.log('Enrollment:', enrollment);

  const modules = await CourseModule.find({ courseId: enrollment.courseId })
    .sort({ order: 1 })
    .lean();

  if (!modules.length) return [];

  console.log('Modules:', modules);

  // Fetch ALL topics at once (NO N+1)
  const topics = await Topic.find({
    moduleId: { $in: modules.map(m => m._id) },
  })
    .sort({ order: 1 })
    .lean();

  console.log('Topics:', topics);

  // Group topics by module
  const topicsByModule = topics.reduce((acc, topic) => {
    const key = topic.moduleId.toString();
    acc[key] = acc[key] || [];
    acc[key].push(topic);
    return acc;
  }, {} as Record<string, any[]>);

  console.log('Topics by Module:', topicsByModule);

  // Build timeline with statuses
  const now = new Date();
  let currentStart = new Date(enrollment.createdAt);

  console.log('Enrollment Start Date:', currentStart + 'date now:', now);

  return modules.map(module => {
    const startDate = new Date(currentStart);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + module.durationInDays);

    let status: "upcoming" | "active" | "completed";
    if (now < startDate) status = "upcoming";
    else if (now <= endDate) status = "active";
    else status = "completed";

    currentStart = endDate;
    console.log({
      moduleId: module._id,
      title: module.title,
      order: module.order,
      startDate,
      endDate,
      status,
      topics: (topicsByModule[module._id.toString()] || []).map(topic => ({
        topicId: topic._id,
        title: topic.title,
        order: topic.order,
        status, // inherited
         materials: status === "upcoming" ? [] : topic.materials,
      }))
    });

    return {
      moduleId: module._id,
      title: module.title,
      order: module.order,
      startDate,
      endDate,
      status,
      topics: (topicsByModule[module._id.toString()] || []).map(topic => ({
        topicId: topic._id,
        title: topic.title,
        order: topic.order,
        status, // inherited
         materials: status === "upcoming" ? [] : topic.materials,
      })),
    };
  });
};



