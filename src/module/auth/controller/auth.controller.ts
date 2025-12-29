import { Request, Response } from "express";
import { loginUser, registerStudent } from "../service/auth.service";
import { apiResponse } from "../../../utils/apiResponse";

export const register = async (req: Request, res: Response) => {
  const user = await registerStudent(req.body);
  return apiResponse(res, 201, "Registered successfully", user);
};

export const loginStudent = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const data = await loginUser(email, password, "student");
  return apiResponse(res, 200, "Login successful", data);
};

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const data = await loginUser(email, password, "admin");
  return apiResponse(res, 200, "Login successful", data);
};
