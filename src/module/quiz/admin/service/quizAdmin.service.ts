import { Types } from "mongoose";
import { Quiz } from "../../model/quiz.model";
import { QuizQuestion } from "../../model/quizQuestions.model";
import { QuizAttempt } from "../../model/quizAttemp.model";
import { ApiError } from "../../../../utils/apiError";

export const createModuleQuizService = async (moduleId: string) => {
  const existingQuiz = await Quiz.findOne({ moduleId });
  if (existingQuiz) {
    throw new ApiError(400, "Quiz already exists for this module");
  }

  const quiz = await Quiz.create({
    moduleId,
    durationMinutes: 5,
    totalQuestions: 0,
  });

  return quiz;
};

export const addQuizQuestionService = async (
  quizId: string,
  data: {
    question: string;
    options: string[];
    correctOptionIndex: number;
  }
) => {
  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    throw new ApiError(404, "Quiz not found");
  }

  if (
    data.correctOptionIndex < 0 ||
    data.correctOptionIndex >= data.options.length
  ) {
    throw new ApiError(400, "Correct option index is invalid");
  }

  const question = await QuizQuestion.create({
    quizId,
    question: data.question,
    options: data.options,
    correctOptionIndex: data.correctOptionIndex,
  });

  // Update total questions count
  quiz.totalQuestions += 1;
  await quiz.save();

  return question;
};

export const updateQuizQuestionService = async (
  questionId: string,
  payload: Partial<{
    question: string;
    options: string[];
    correctOptionIndex: number;
  }>
) => {
  const question = await QuizQuestion.findById(questionId);
  if (!question) {
    throw new ApiError(404, "Quiz question not found");
  }

  // Validate correct option index if options are being updated
  if (
    payload.options &&
    payload.correctOptionIndex !== undefined &&
    payload.correctOptionIndex >= payload.options.length
  ) {
    throw new ApiError(400, "Correct option index is invalid");
  }

  if (payload.question !== undefined) question.question = payload.question;
  if (payload.options !== undefined) question.options = payload.options;
  if (payload.correctOptionIndex !== undefined)
    question.correctOptionIndex = payload.correctOptionIndex;

  await question.save();
  return question;
};

export const deleteQuizQuestionService = async (questionId: string) => {
  const question = await QuizQuestion.findById(questionId);
  if (!question) {
    throw new ApiError(404, "Quiz question not found");
  }

  const quiz = await Quiz.findById(question.quizId);
  if (!quiz) {
    throw new ApiError(404, "Parent quiz not found");
  }

  await question.deleteOne();

  quiz.totalQuestions = Math.max(quiz.totalQuestions - 1, 0);
  await quiz.save();

  return { message: "Quiz question deleted successfully" };
};

export const getAllQuizzesService = async () => {
  const quizzes = await Quiz.find()
    .populate({
      path: "moduleId",
      select: "_id title order courseId",
    })
    .sort({ createdAt: -1 });

  return quizzes;
};

export const getQuestionsForAdmin = async (quizId: string) => {
    // 1. Validate quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      throw new ApiError(404, "Quiz not found");
    }

    // 2. Fetch questions (with correct answers)
    const questions = await QuizQuestion.find({
      quizId: new Types.ObjectId(quizId),
    }).sort({ createdAt: 1 });

    return {
      quizId: quiz._id,
      totalQuestions: quiz.totalQuestions,
      durationMinutes: quiz.durationMinutes,
      questions,
    };
};

export const deleteQuizService = async (quizId: string) => {
  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    throw new ApiError(404, "Quiz not found");
  }

  // Delete all related questions
  await QuizQuestion.deleteMany({ quizId });

  // Delete all related attempts
  await QuizAttempt.deleteMany({ quizId });

  // Delete the quiz itself
  await quiz.deleteOne();

  return {
    message: "Quiz, questions, and attempts deleted successfully",
  };
};
