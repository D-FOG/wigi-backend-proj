import { Router } from "express";
import { getCourses, getCourse, enroll, getMyCourseDetails, trackCompleteTopic, getMyCoursesList  } from "../controller/course.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";

const router = Router();

router.get("/courses", getCourses);
router.get("/courses/:courseId", getCourse);

router.post("/courses/:courseId/enroll", authMiddleware, enroll);

router.get("/my-courses", authMiddleware, getMyCoursesList);
router.get("/my-courses/:courseId", authMiddleware, getMyCourseDetails);

router.post(
  "/my-courses/:courseId/topics/:topicId/complete",
  authMiddleware,
  trackCompleteTopic
);

export default router;