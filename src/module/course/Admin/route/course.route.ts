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
  updateTopicMaterial,
  getAdminCourses,
  getCourseModules,
  getModuleTopics
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

router.put("/admin/courses/:courseId", authMiddleware, adminOnly, updateCourse);
router.delete("/admin/courses/:courseId", authMiddleware, adminOnly, deleteCourse);

router.put("/admin/modules/:moduleId", authMiddleware, adminOnly, updateModule);
router.delete("/admin/modules/:moduleId", authMiddleware, adminOnly, deleteModule);

router.put("/admin/topics/:topicId", authMiddleware, adminOnly, updateTopic);
router.delete("/admin/topics/:topicId", authMiddleware, adminOnly, deleteTopic);

router.put(
  "/admin/topics/:topicId/material",
  authMiddleware,
  adminOnly,
  upload.single("material"),
  updateTopicMaterial
);

router.get(
  "/admin/courses",
  authMiddleware,
  adminOnly,
  getAdminCourses
);

router.get(
  "/admin/courses/:courseId/modules",
  authMiddleware,
  adminOnly,
  getCourseModules
);

router.get(
  "/admin/modules/:moduleId/topics",
  authMiddleware,
  adminOnly,
  getModuleTopics
);
export default router;
