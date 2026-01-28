import { Schema, model, Types, Document } from "mongoose";

export interface IQuiz extends Document {
  moduleId: Types.ObjectId;
  durationMinutes: number; // 5
  totalQuestions: number;
}

const quizSchema = new Schema(
  {
    moduleId: {
      type: Types.ObjectId,
      ref: "CourseModule",
      required: true,
      unique: true, // one quiz per module
    },

    durationMinutes: {
      type: Number,
      default: 5,
    },

    totalQuestions: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Quiz = model<IQuiz>("Quiz", quizSchema);
