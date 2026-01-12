import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../user/model/user.model";
import { ApiError } from "../../../utils/apiError";
import { Course } from "../../course/model/course.model";
import { Enrollment } from "../../course/model/enrollment.model";


export const registerStudent = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  // countryCode: string;
  phoneNumber: string;
  course: string;
  occupation: string;
  courseOfStudy: string;
  level: string;
  universityName: string;
  jobTitle: string;
  companyName: string;
  password: string;
}) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new ApiError(400, "Email already exists");

  const hashed = await bcrypt.hash(data.password, 10);

  const userDoc = await User.create({
    ...data,
    password: hashed,
    role: "student",
  });


  // Find course by track
  const course = await Course.findOne({
    track: data.course,
    isPublished: true,
  });

  if (!course) {
    throw new ApiError(400, "Selected course not available");
  }

  // Create enrollment
  await Enrollment.create({
    userId: userDoc._id,
    courseId: course._id,
  });

  const { password, __v, ...user } = userDoc.toObject();
  

  return user;
};

export const loginUser = async (
  email: string,
  password: string,
  role: "student" | "admin"
) => {
  const user = await User.findOne({ email, role });
  if (!user) throw new ApiError(400, "Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(400, "Invalid credentials");

  const courseTrack = user.course;
  const course = await Course.findOne({
      track: user.course,
      isPublished: true,
    });
    
 const courseId = course ? course._id : null;

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  console.log("user token generated", token);

  const safeUser = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    profileCompleted: user.profileCompleted,
    courseId: courseId,
  };

  return { user: safeUser, token };
};

