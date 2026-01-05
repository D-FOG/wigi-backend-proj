import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";

import AuthRoute from "./module/auth/route/auth.route";
import UserRoute from "./module/user/route/user.route";
import CourseRoute from "./module/course/route/course.route";
import AdminRoute from "./module/course/Admin/route/course.route";
import CertificateRoute from "./module/certificate/route/certificate.route"
import { errorHandler } from './middlewares/error.middleware';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(cors({
  origin: "*",          // allow all origins
  methods: ["GET","POST","PUT","PATCH","DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (_req, res) => {
  res.redirect('/api-docs');
});

//routes middleware
app.use('/api/v1', AuthRoute);
app.use('/api/v1/users', UserRoute);
app.use('/api/v1', CourseRoute);
app.use('/api/v1', AdminRoute);
app.use('/api/v1', CertificateRoute);

//error handler
app.use(errorHandler);

export default app;
