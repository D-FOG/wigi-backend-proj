import dotenv from 'dotenv';
import express from "express";
import cors from "cors";

import AuthRoute from "./module/auth/route/auth.route";
import { errorHandler } from './middlewares/error.middleware';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (_req, res) => {
  res.redirect('/api-docs');
});

//routes middleware
app.use('/api/v1', AuthRoute)._router;

//error handler
app.use(errorHandler);

export default app;
