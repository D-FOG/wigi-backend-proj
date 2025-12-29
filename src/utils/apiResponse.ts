export const apiResponse = (
  res: any,
  statusCode: number,
  message: string,
  data?: any
) => {
  return res.status(statusCode).json({
    success: statusCode < 400,
    message,
    data,
  });
};
