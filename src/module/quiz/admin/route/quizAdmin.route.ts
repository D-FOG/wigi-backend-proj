import { Router } from "express";
import * as controller from "../controller/quizAdmin.controller";
import { authMiddleware } from "../../../../middlewares/auth.middleware";
import { adminOnly } from "../../../../middlewares/admin.middleware";

const router = Router();

router.post(
  "/admin/modules/:moduleId/quiz",
  authMiddleware,
  adminOnly,
  controller.createModuleQuiz
);

router.post(
  "/admin/quizzes/:quizId/questions",
  authMiddleware,
  adminOnly,
  controller.addQuizQuestion
);

router.patch(
  "/admin/quiz-questions/:questionId",
  authMiddleware,
  adminOnly,
  controller.updateQuizQuestion
);

router.delete(
  "/admin/quiz-questions/:questionId",
  authMiddleware,
  adminOnly,
  controller.deleteQuizQuestion
);



export default router;