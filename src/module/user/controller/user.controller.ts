import { Request, Response } from "express";
import { getMyProfile, updateMyProfile } from "../service/user.service";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { deleteMyAccount } from "../service/user.service";
import { apiResponse } from "../../../utils/apiResponse";

export const getProfile = async (req: AuthRequest, res: Response) => {
  const profile = await getMyProfile(req.user!.id);
  return apiResponse(res, 200, "Profile Fetched successfully", profile);
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  const profile = await updateMyProfile(req.user!.id, req.body, req.file);
  return apiResponse(res, 200, "Profile Updated successfully", profile);
};
export const deleteAccount = async (req: AuthRequest, res: Response) => {
  await deleteMyAccount(req.user!.id);
  return apiResponse(res, 200, "Account deleted successfully");
};

