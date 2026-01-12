import { User } from "../../../user/model/user.model";
import { ApiError } from "../../../../utils/apiError";

interface GetStudentsQuery {
  course?: string;
  profileCompleted?: string;
  search?: string;
  page?: string;
  limit?: string;
}

export const getStudentsService = async (query: GetStudentsQuery) => {
  const {
    course,
    profileCompleted,
    search,
    page = "1",
    limit = "20",
  } = query;

  const filter: any = {
    role: "student",
  };

  // filter by course
  if (course) {
    filter.course = course;
  }

  // filter by profile completion
  if (profileCompleted !== undefined) {
    filter.profileCompleted = profileCompleted === "true";
  }

  // search by name or email
  if (search) {
    filter.$or = [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const [students, total] = await Promise.all([
    User.find(filter)
      .select("-password -__v")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber),

    User.countDocuments(filter),
  ]);

  return {
    students,
    meta: {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    },
  };
};
