import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../user/model/user.model.js";
import { ApiError } from "../../../utils/apiError.js";


export const registerStudent = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new ApiError(400, "Email already exists");

  const hashed = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    ...data,
    password: hashed,
    role: "student",
  });

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

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  const safeUser = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    profileCompleted: user.profileCompleted,
  };

  return { user: safeUser, token };
};

