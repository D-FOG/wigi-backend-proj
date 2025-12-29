import app from "./app.js";
import { connectDB } from "../src/config/db.js";
// import { env } from "./config/env";

const startServer = async () => {
  await connectDB();

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};

startServer();
