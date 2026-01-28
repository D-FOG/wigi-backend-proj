import { Router } from 'express';
import { getStudentQuiz, submitQuizAttempt, checkExamEligibility, getFinalExam, submitFinalExam } from '../controller/quiz.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';

const router = Router();

router.get('/student/quiz/:quizId', authMiddleware, getStudentQuiz);
router.post('/student/quiz/:quizId/attempt', authMiddleware, submitQuizAttempt);
router.get('/student/course/:courseId/exam/eligibility', authMiddleware, checkExamEligibility);
router.get('/student/course/:courseId/final-exam', authMiddleware, getFinalExam);
router.post('/student/course/:courseId/final-exam/submit', authMiddleware, submitFinalExam);

export default router;