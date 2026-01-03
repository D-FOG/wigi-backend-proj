import { Response } from "express";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { apiResponse } from "../../../utils/apiResponse";
import { getMyCertificatesService } from "../service/certificate.service";

export const getMyCertificates = async (
  req: AuthRequest,
  res: Response
) => {
  const certs = await getMyCertificatesService(req.user!.id);
  return apiResponse(res, 200, "Certificates fetched", certs);
};
