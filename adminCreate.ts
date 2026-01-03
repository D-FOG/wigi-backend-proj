import * as bcrypt from "bcrypt";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { User } from "./src/module/user/model/user.model";

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI!);

  const hashed = await bcrypt.hash("admin123", 10);

  await User.create({
    firstName: "Super Admin",
    lastName: "User",
    email: "admin@school.com",
    password: hashed,
    role: "admin",
  });

  console.log("Admin created");

  await mongoose.disconnect();
};

createAdmin()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
