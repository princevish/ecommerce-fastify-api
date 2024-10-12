import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";
import { fastifyPlugin } from "fastify-plugin";

export const swaggerSetup = fastifyPlugin(async (fastify: FastifyInstance) => {
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: "E-Commerce API with swagger",
        description: "",
        version: "0.0.0",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Development server",
        },
        {
          url: "https://73mn6kt5-3000.inc1.devtunnels.ms",
          description: "Production server",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            description: "JWT Authorization header using the Bearer scheme",
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here",
      },
    },
  });

  await fastify.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      deepLinking: false,
    },
    theme: {
      title: "E-Commerce API with Swagger UI",
    },
  });

  fastify.log.info(`Swagger UI is running on http://localhost:${fastify.config.PORT}/docs`);
});
