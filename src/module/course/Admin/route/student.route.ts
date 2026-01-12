import { Router } from "express";
import { getStudents } from "../controller/student.controller";
import { authMiddleware } from "../../../../middlewares/auth.middleware";
import { adminOnly } from "../../../../middlewares/admin.middleware";

const router = Router();

router.get("/admin/students", authMiddleware, adminOnly, getStudents);

export default router;
