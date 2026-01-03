import { Router } from "express";
import {
  adminCreateCourse,
  adminCreateModule,
  adminCreateTopic,
  updateCourse,
  deleteCourse,
  updateModule,
  deleteModule,
  updateTopic,
  deleteTopic,
} from "../controller/course.controller";

import { authMiddleware } from "../../../../middlewares/auth.middleware";
import { adminOnly } from "../../../../middlewares/admin.middleware";
import { upload } from "../../../../middlewares/upload.middleware";

const router = Router();

// courses
router.post(
  "/admin/courses",
  authMiddleware,
  adminOnly,
  adminCreateCourse
);

// modules
router.post(
  "/admin/courses/:courseId/modules",
  authMiddleware,
  adminOnly,
  adminCreateModule
);

// topics + pdf upload
router.post(
  "/admin/modules/:moduleId/topics",
  authMiddleware,
  adminOnly,
  upload.single("material"),
  adminCreateTopic
);

router.put("/courses/:courseId", authMiddleware, adminOnly, updateCourse);
router.delete("/courses/:courseId", authMiddleware, adminOnly, deleteCourse);

router.put("/modules/:moduleId", authMiddleware, adminOnly, updateModule);
router.delete("/modules/:moduleId", authMiddleware, adminOnly, deleteModule);

router.put("/topics/:topicId", authMiddleware, adminOnly, updateTopic);
router.delete("/topics/:topicId", authMiddleware, adminOnly, deleteTopic);

export default router;
