import { Schema, model, Types } from "mongoose";

const certificateSchema = new Schema(
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

    certificateUrl: {
      type: String,
      required: true,
    },

    issuedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Certificate = model("Certificate", certificateSchema);
