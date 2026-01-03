import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description?: string;
  createdBy: mongoose.Types.ObjectId;
  isPublished: boolean;
}


const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Course = mongoose.model<ICourse>('Course', courseSchema);

