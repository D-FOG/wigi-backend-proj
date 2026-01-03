//import mongoose, { Schema, Document } from 'mongoose';

// export interface IEnrollment extends Document {
//   userId: mongoose.Types.ObjectId;
//   courseId: mongoose.Types.ObjectId;
//   completedTopics: mongoose.Types.ObjectId[];
//   progress: number;
//   status: "in_progress" | "completed";
// }


// const enrollmentSchema = new Schema(
//   {
//     userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },

//     completedTopics: [
//       { type: Schema.Types.ObjectId, ref: "Topic" }
//     ],

//     progress: { type: Number, default: 0 },
//     status: {
//       type: String,
//       enum: ["in_progress", "completed"],
//       default: "in_progress",
//     },
//   },
//   { timestamps: true }
// );

// export const Enrollment = mongoose.model<IEnrollment>('Enrollment', enrollmentSchema);

import { Schema, model, Types } from "mongoose";

const enrollmentSchema = new Schema(
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

    progress: {
      type: Number, // percentage
      default: 0,
    },

    completedTopics: [
        {
            moduleId: {
            type: Types.ObjectId,
            required: true,
            },
            topicId: {
            type: Types.ObjectId,
            required: true,
            },
        },
    ],

    status: {
      type: String,
      enum: ["in_progress", "completed"],
      default: "in_progress",
    },
  },
  { timestamps: true }
);

export const Enrollment = model("Enrollment", enrollmentSchema);
