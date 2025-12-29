import { Router } from "express";
import { loginAdmin, loginStudent, register } from "../controller/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", loginStudent);
router.post("/admin/login", loginAdmin);

export default router;
