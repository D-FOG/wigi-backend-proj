import app from "./app";
import { connectDB } from "./config/db";
// import { env } from "./config/env";

const startServer = async () => {
  await connectDB();

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};

startServer();
