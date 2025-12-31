import { Router } from "express";
import { getProfile, updateProfile, deleteAccount } from "../controller/user.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { upload } from "../../../middlewares/upload.middleware";

const router = Router();

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, upload.single("profilePicture"), updateProfile);
router.delete("/account", authMiddleware, deleteAccount);

export default router;
