import { Certificate } from "../model/certificate.model";

export const issueCertificateService = async (
  userId: string,
  courseId: string
) => {
  const exists = await Certificate.findOne({ userId, courseId });
  if (exists) return exists;

  const certificateUrl = `https://your-domain.com/certificates/${userId}-${courseId}.pdf`; //update with real URL generation logic

  return Certificate.create({
    userId,
    courseId,
    certificateUrl,
  });
};

export const getMyCertificatesService = async (userId: string) => {
  return Certificate.find({ userId }).populate("courseId", "title");
};
