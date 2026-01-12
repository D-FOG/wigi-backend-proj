import { Request, Response } from "express";
import { getStudentsService } from "../service/student.service";
import { apiResponse } from "../../../../utils/apiResponse";
import { AuthRequest } from "../../../../middlewares/auth.middleware";

//Get list of students with filters and pagination
export const getStudents = async (req: AuthRequest, res: Response) => {
  const studentsData = await getStudentsService(req.query);
  return apiResponse(res, 200, "Students fetched", studentsData);
};