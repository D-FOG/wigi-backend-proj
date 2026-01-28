import { Schema, model, Types, Document } from "mongoose";

export interface IFinalExamAttempt extends Document {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  score: number;
  totalQuestions: number;
  passed: boolean;
  startedAt: Date;
  submittedAt: Date;
}

const finalExamAttemptSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    courseId: {
      type: Types.ObjectId,
      ref: "Course",
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

    passed: {
      type: Boolean,
      required: true,
    },

    startedAt: { type: Date, required: true },
    submittedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

// One final exam per course per student
finalExamAttemptSchema.index(
  { userId: 1, courseId: 1 },
  { unique: true }
);

export const FinalExamAttempt = model<IFinalExamAttempt>(
  "FinalExamAttempt",
  finalExamAttemptSchema
);
