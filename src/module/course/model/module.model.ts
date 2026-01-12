import mongoose, { Schema, Document } from 'mongoose';

export interface ICourseModule extends Document {
  courseId: mongoose.Types.ObjectId;
  title: string;
  order: number;
  durationInDays: number;
}


const courseModuleSchema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  title: { type: String, required: true },
  order: { type: Number, default: 0 },
  durationInDays: {
    type: Number, // 7, 14, 30
    required: true,
  }
});


export const CourseModule = mongoose.model<ICourseModule>('CourseModule', courseModuleSchema);