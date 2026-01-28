import { Schema, model, Types, Document } from "mongoose";
export interface IQuizQuestion extends Document {
  quizId: Types.ObjectId;
  question: string;
  options: string[];
  correctOptionIndex: number;
}

const quizQuestionSchema = new Schema(
  {
    quizId: {
      type: Types.ObjectId,
      ref: "Quiz",
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    options: {
      type: [String],
      required: true,
    },

    correctOptionIndex: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const QuizQuestion = model<IQuizQuestion>(
  "QuizQuestion",
  quizQuestionSchema
);
