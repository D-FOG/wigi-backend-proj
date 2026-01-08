import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import { ApiError } from "../utils/apiError";

export const adminOnly = (
  req: AuthRequest,
  _: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "admin") {
    throw new ApiError(403, "Admin access only");
  }
  next();
};
