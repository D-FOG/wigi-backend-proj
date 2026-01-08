import mongoose, { Schema, Document } from 'mongoose';
export interface ITopicMaterial {
  url: string;
  publicId: string;
  type: "pdf" | "image";
}

export interface ITopic extends Document {
  moduleId: mongoose.Types.ObjectId;
  title: string;
  materials: ITopicMaterial[];
  order: number;
}

const topicSchema = new Schema(
  {
    moduleId: {
      type: Schema.Types.ObjectId,
      ref: "CourseModule",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    materials: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
        type: {
          type: String,
          enum: ["pdf", "image"],
          required: true,
        },
      },
    ],

    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);



export const Topic = mongoose.model<ITopic>('Topic', topicSchema);
