import { Quiz } from "../model/quiz.model";
import { QuizQuestion } from "../model/quizQuestions.model";
import { QuizAttempt } from "../model/quizAttemp.model";
import { CourseModule } from "../../course/model/module.model";
import { FinalExamAttempt } from "../model/finalExamAttempt.model";
import { ApiError } from "../../../utils/apiError";

export const getStudentQuizService = async (
  quizId: string,
  userId: string
) => {
  const attempted = await QuizAttempt.findOne({ quizId, userId });
  if (attempted) {
    throw new ApiError(400, "Quiz already attempted");
  }

  const quiz = await Quiz.findById(quizId).lean();
  if (!quiz) throw new ApiError(404, "Quiz not found");

  const questions = await QuizQuestion.find({ quizId })
    .select("question options")
    .lean();

  if (!questions.length) {
    throw new ApiError(400, "Quiz questions not available");
  }

  return {
    quizId,
    durationMinutes: quiz.durationMinutes,
    totalQuestions: questions.length,
    questions: questions.map((q, index) => ({
      index,
      question: q.question,
      options: q.options,
    })),
  };
};

export const submitQuizAttemptService = async ({
  quizId,
  userId,
  answers,
  startedAt,
}: {
  quizId: string;
  userId: string;
  answers: number[];
  startedAt: Date;
}) => {
  const existing = await QuizAttempt.findOne({ quizId, userId });
  if (existing) {
    throw new ApiError(400, "Quiz already attempted");
  }

  const quiz = await Quiz.findById(quizId).lean();
  if (!quiz) throw new ApiError(404, "Quiz not found");

  const questions = await QuizQuestion.find({ quizId }).lean();
  if (!questions.length) {
    throw new ApiError(400, "Quiz questions not found");
  }

  // ⏱ 5-minute timer enforcement
  const now = new Date();
  const diffMinutes =
    (now.getTime() - new Date(startedAt).getTime()) / 60000;

  if (diffMinutes > quiz.durationMinutes) {
    throw new ApiError(400, "Quiz time elapsed");
  }

  if (answers.length !== questions.length) {
    throw new ApiError(400, "All questions must be answered");
  }

  let score = 0;

  questions.forEach((q, index) => {
    if (answers[index] === q.correctOptionIndex) {
      score++;
    }
  });

  await QuizAttempt.create({
    userId,
    quizId,
    answers,
    score,
    totalQuestions: questions.length,
    startedAt,
    submittedAt: now,
  });

  return {
    score,
    totalQuestions: questions.length,
    attempted: true,
  };
};

export const checkExamEligibilityService = async (
  userId: string,
  courseId: string
) => {
  const modules = await CourseModule.find({ courseId }).select("_id");

  if (modules.length < 5) {
    return { eligible: false, reason: "Course not fully configured" };
  }

  const quizzes = await Quiz.find({
    moduleId: { $in: modules.map((m) => m._id) },
  }).select("_id");

  if (quizzes.length < 5) {
    return { eligible: false, reason: "Quizzes not fully configured" };
  }

  const attempts = await QuizAttempt.countDocuments({
    userId,
    quizId: { $in: quizzes.map((q) => q._id) },
  });

  if (attempts < quizzes.length) {
    return { eligible: false, reason: "All module quizzes not attempted" };
  }

  return { eligible: true };
};

export const getFinalExamService = async (
  userId: string,
  courseId: string
) => {
  const eligibility = await checkExamEligibilityService(userId, courseId);
  if (!eligibility.eligible) {
    throw new ApiError(403, eligibility.reason!);
  }

  const existingExam = await FinalExamAttempt.findOne({ userId, courseId });
  if (existingExam) {
    throw new ApiError(400, "Final exam already taken");
  }

  const modules = await CourseModule.find({ courseId }).select("_id");
  const quizzes = await Quiz.find({
    moduleId: { $in: modules.map((m) => m._id) },
  }).select("_id");

  const questions = await QuizQuestion.find({
    quizId: { $in: quizzes.map((q) => q._id) },
  }).select("question options");

  return {
    durationMinutes: questions.length * 1, // optional: 1 min per question
    totalQuestions: questions.length,
    questions: questions.map((q, index) => ({
      index,
      question: q.question,
      options: q.options,
    })),
  };
};

export const submitFinalExamService = async ({
  userId,
  courseId,
  answers,
  startedAt,
}: {
  userId: string;
  courseId: string;
  answers: number[];
  startedAt: Date;
}) => {
  const existing = await FinalExamAttempt.findOne({ userId, courseId });
  if (existing) {
    throw new ApiError(400, "Final exam already submitted");
  }

  const modules = await CourseModule.find({ courseId }).select("_id");
  const quizzes = await Quiz.find({
    moduleId: { $in: modules.map((m) => m._id) },
  }).select("_id");

  const questions = await QuizQuestion.find({
    quizId: { $in: quizzes.map((q) => q._id) },
  });

  if (answers.length !== questions.length) {
    throw new ApiError(400, "All questions must be answered");
  }

  let score = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.correctOptionIndex) score++;
  });

  const percentage = (score / questions.length) * 100;
  const passed = percentage >= 70;

  await FinalExamAttempt.create({
    userId,
    courseId,
    score,
    totalQuestions: questions.length,
    passed,
    startedAt,
    submittedAt: new Date(),
  });

  return {
    score,
    totalQuestions: questions.length,
    percentage,
    passed,
    certificateEligible: passed,
  };
};

