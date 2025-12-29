import bcrypt from "bcrypt";
import { User } from "./src/module/user/model/user.model.js";

const createAdmin = async () => {
  const hashed = await bcrypt.hash("admin123", 10);

  await User.create({
    name: "Super Admin",
    email: "admin@school.com",
    password: hashed,
    role: "admin",
  });

  console.log("Admin created");
};
