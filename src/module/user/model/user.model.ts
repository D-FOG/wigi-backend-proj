import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  // auth
  email: string;
  password: string;
  role: "student" | "admin";

  // profile
  firstName: string;
  lastName: string;
  about?: string;
  headline?: string;
  country?: string;
  state?: string;
  phoneNumber?: string;

  occupation: "student" | "professional" | "self employed";

  // education / work
  course?: string;
  courseOfStudy?: string;
  jobTitle?: string;
  companyName?: string;
  level?: string;
  universityName?: string;

  profileImage?:{
    url: string;
    publicId: string;
  }

  profileCompleted: boolean;
}

const userSchema = new Schema<IUser>(
  {
    // auth
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    // profile
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    about: { type: String, maxlength: 500 },
    headline: { type: String, maxlength: 100 },
    country: { type: String },
    state: { type: String},
    phoneNumber: { type: String },

    occupation: {
      type: String,
      enum: ["student", "professional", "self employed"],
      required: true,
    },

    // education / work
    course: { type: String },
    level: { type: String },
    universityName: { type: String },
    courseOfStudy: { type: String },
    jobTitle: { type: String },
    companyName: { type: String },

    profileImage: {
      url: { type: String },
      publicId: { type: String },
    },

    profileCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
