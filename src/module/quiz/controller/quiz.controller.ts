import { Request, Response } from 'express';
import { getStudentQuizService, submitQuizAttemptService, checkExamEligibilityService, getFinalExamService, submitFinalExamService } from '../service/quiz.service';
import { AuthRequest } from '../../../middlewares/auth.middleware';
import { apiResponse } from '../../../utils/apiResponse';

export const getStudentQuiz = async (req: AuthRequest, res: Response) => {
  const { quizId } = req.params;
  const userId = req.user!.id; 
  const quizData = await getStudentQuizService(quizId, userId);   
  return apiResponse(res, 200, 'Quiz fetched successfully', quizData);
};

export const submitQuizAttempt = async (req: AuthRequest, res: Response) => {
  const { quizId } = req.params;
  const userId = req.user!.id; 
  const { answers, startedAt } = req.body;
  const submitResponse =await submitQuizAttemptService({ quizId, userId, answers, startedAt });
  return apiResponse(res, 200, 'Quiz submitted successfully', submitResponse);
};

export const checkExamEligibility = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id; 
  const courseId = req.params.courseId;
  const eligibility = await checkExamEligibilityService(userId, courseId);
  return apiResponse(res, 200, 'Eligibility checked successfully', eligibility);
};

export const getFinalExam = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id; 
  const { courseId } = req.params;
  const examData = await getFinalExamService(userId, courseId);
  return apiResponse(res, 200, 'Final exam fetched successfully', examData);
};

export const submitFinalExam = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id; 
  const { courseId } = req.params;
  const { answers, startedAt } = req.body;
  const submitResponse = await submitFinalExamService({ userId, courseId, answers, startedAt });
  return apiResponse(res, 200, 'Final exam submitted successfully', submitResponse);
};