import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";

import AuthRoute from "./module/auth/route/auth.route";
import UserRoute from "./module/user/route/user.route";
import { errorHandler } from './middlewares/error.middleware';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (_req, res) => {
  res.redirect('/api-docs');
});

//routes middleware
app.use('/api/v1', AuthRoute)._router;
app.use('/api/v1/users', UserRoute)._router;

//error handler
app.use(errorHandler);

export default app;
