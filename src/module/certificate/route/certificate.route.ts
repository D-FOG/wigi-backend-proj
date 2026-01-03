import { Router } from "express";
import { getMyCertificates } from "../controller/certificate.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";

const router = Router();

router.get("/certificates", authMiddleware, getMyCertificates);

export default router;
