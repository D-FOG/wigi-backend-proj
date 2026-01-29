import { createModuleQuizService, addQuizQuestionService, updateQuizQuestionService, deleteQuizQuestionService, getAllQuizzesService, getQuestionsForAdmin } from "../service/quizAdmin.service";
import { Request, Response } from "express";
import { apiResponse } from "../../../../utils/apiResponse";

export const createModuleQuiz = async (req: Request, res: Response) => {
  const quiz = await createModuleQuizService(req.params.moduleId);
  return apiResponse(res, 201, "Quiz created successfully", quiz);
};

export const addQuizQuestion = async (req: Request, res: Response) => {
  const { quizId } = req.params;
  const { question, options, correctOptionIndex } = req.body;

  const createdQuestion = await addQuizQuestionService(quizId, {
    question,
    options,
    correctOptionIndex,
  });

  return apiResponse(res, 201, "Question added successfully", createdQuestion);
};

export const updateQuizQuestion = async (req:Request, res:Response) => {
  const { questionId } = req.params;

  const updated = await updateQuizQuestionService(questionId, req.body);
  return apiResponse(res, 200, "Question updated successfully", updated);
};

export const deleteQuizQuestion = async (req:Request, res:Response) => {
  const { questionId } = req.params;

  const result = await deleteQuizQuestionService(questionId);
  return apiResponse(res, 200, "Question deleted successfully", result);
};

export const getAllQuizzes = async( req:Request, res:Response) => {
  const quizzes = await getAllQuizzesService();
  return apiResponse(res, 200, "Quizzes fetched successfully", quizzes);
};

export const getQuestionsForAdmins = async (req: Request, res: Response) => {
    try {
      const { quizId } = req.params;

      const data = await getQuestionsForAdmin(quizId);

      return res.status(200).json({
        success: true,
        message: "Quiz questions fetched successfully",
        data,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || "Failed to fetch quiz questions",
      });
    }
};

