import mongoose from "mongoose";
import cloudinary from "../../../config/cloudinary";
import { User } from "../../user/model/user.model";
import { ApiError } from "../../../utils/apiError";

export const getMyProfile = async (userId: string) => {
  const profile = await User.findById(userId).select("-password -__v");
  if (!profile) throw new ApiError(404, "Profile not found");
  return profile;
};

export const updateMyProfile = async (
  userId: string,
  data: any,
  file?: Express.Multer.File
) => {
  const profile = await User.findById(userId);
  if (!profile) throw new ApiError(404, "Profile not found");

  if (file) {
    // Upload new image to Cloudinary
    if (profile.profileImage?.publicId) {
      await cloudinary.uploader.destroy(profile.profileImage.publicId);
    }
    const uploadResult = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
      {
        folder: "wigi_profile_images",   
      }
    );

    profile.profileImage = {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
    }
  }

  const allowedFields = [
    "firstName",
    "lastName",
    "about",
    "headline",
    "state",
    "country",
    "email",
    "phoneNumber",
    "companyName"
  ]
  
  allowedFields.forEach((field) => {
    if (data[field] !== undefined){
        (profile as any)[field] = data[field];
    }
  })

  await profile.save();
  return profile;
};

export const deleteMyAccount = async (userId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findByIdAndDelete(userId, { session });
    if (!user) throw new ApiError(404, "User not found");

    //await Profile.findOneAndDelete({ userId }, { session });

    // 🔜 Future additions:
    // await Course.deleteMany({ ownerId: userId }, { session });
    // await Enrollment.deleteMany({ userId }, { session });

    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};
