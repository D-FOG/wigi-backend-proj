import mongoose, { Schema, Document } from 'mongoose';

export interface ITopic extends Document {
  moduleId: mongoose.Types.ObjectId;
  title: string;
  materialUrl: string; // PDF (Cloudinary / S3)
  order: number;
}

const topicSchema = new Schema({
  moduleId: { type: Schema.Types.ObjectId, ref: "CourseModule", required: true },
  title: { type: String, required: true },
  materialUrl: { type: String, required: true },
  order: { type: Number, default: 0 },
});


export const Topic = mongoose.model<ITopic>('Topic', topicSchema);
