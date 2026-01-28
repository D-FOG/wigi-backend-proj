import { Schema, model, Types, Document } from "mongoose";
export interface IQuizAttempt extends Document {
  userId: Types.ObjectId;
  quizId: Types.ObjectId;
  answers: number[];
  score: number;
  totalQuestions: number;
  startedAt: Date;
  submittedAt: Date;
}

const quizAttemptSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    quizId: {
      type: Types.ObjectId,
      ref: "Quiz",
      required: true,
    },

    answers: {
      type: [Number],
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    totalQuestions: {
      type: Number,
      required: true,
    },

    startedAt: { type: Date, required: true },
    submittedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

quizAttemptSchema.index({ userId: 1, quizId: 1 }, { unique: true });

export const QuizAttempt = model<IQuizAttempt>(
  "QuizAttempt",
  quizAttemptSchema
);
