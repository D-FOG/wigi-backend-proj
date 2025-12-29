import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: "student" | "admin";
  };
}

export const authMiddleware = (
  req: AuthRequest,
  _: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Unauthorized: Token missing");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!);

    // ✅ TYPE NARROWING (THIS FIXES THE TS ERROR)
    if (
      typeof decoded !== "object" ||
      !("id" in decoded) ||
      !("role" in decoded)
    ) {
      throw new ApiError(401, "Invalid token payload");
    }

    req.user = {
      id: decoded.id as string,
      role: decoded.role as "student" | "admin",
    };

    next();
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token");
  }
};
