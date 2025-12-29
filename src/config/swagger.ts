import swaggerJsdoc from "swagger-jsdoc";

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

  // VERY IMPORTANT
  apis: ["./src/modules/**/*.swagger.ts"],
});
