import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de Gestión Asistencias",
    version: "1.0.0",
    description: "Documentación de las API para manejar Sistema de Asistencias",
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT}/api`,
      description: "Servidor local",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
