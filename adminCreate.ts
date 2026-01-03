import bcrypt from "bcrypt";
import { User } from "./src/module/user/model/user.model";

const createAdmin = async () => {
  const hashed = await bcrypt.hash("admin123", 10);

  await User.create({
    firstName: "Super Admin",
    lastName: "User",
    email: "admin@school.com",
    password: hashed,
    role: "admin",
  });

  console.log("Admin created");
};
