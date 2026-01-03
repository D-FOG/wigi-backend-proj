import path from "path";
import swaggerJsdoc from "swagger-jsdoc";

const isProduction = process.env.NODE_ENV === "production";

// Determine correct path based on environment
const apisPath = isProduction
  ? path.join(__dirname, "../module/**/*.swagger.js") // compiled JS
  : path.join(__dirname, "../module/**/*.swagger.ts"); // dev with ts-node

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "School LMS API",
      version: "1.0.0",
      description: "Backend API for School Learning Management System",
    },
    servers: [
      {
        url: "http://localhost:4000/api",
        description: "Local server",
      },
      {
        url: "https://wigi-backend-proj.onrender.com/api",
        description: "Render server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [apisPath],
});
