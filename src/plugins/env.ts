import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import fastifyEnv from "@fastify/env";
import { Dialect } from "sequelize";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      PORT: string;
      DATABASE_DIALECT: Dialect;
      DATABASE_HOST: string;
      DATABASE_PORT: string;
      DATABASE_NAME: string;
      DATABASE_USERNAME: string;
      DATABASE_PASSWORD: string;
      JWT_SECRET_KEY: string;
      NODE_ENV: string;
    };
  }
}

export const EnvSetup = fastifyPlugin(async (fastify: FastifyInstance) => {
  await fastify.register(fastifyEnv, {
    confKey: "config",
    dotenv: {
      path:
        process.env.NODE_ENV === "development" ? ".env.development" : ".env",
    },
    schema: {
      type: "object",
      required: [
        "JWT_SECRET_KEY",
        "DATABASE_HOST",
        "DATABASE_NAME",
        "DATABASE_USERNAME",
        "DATABASE_PASSWORD",
      ],
      properties: {
        PORT: {
          type: "string",
          default: 3000,
        },
        DATABASE_DIALECT: {
          type: "string",
          default: "postgres",
        },
        DATABASE_HOST: {
          type: "string",
        },
        DATABASE_PORT: {
          type: "string",
          default: 5432,
        },
        DATABASE_NAME: {
          type: "string",
        },
        DATABASE_USERNAME: {
          type: "string",
          default: "ecommerce",
        },
        DATABASE_PASSWORD: {
          type: "string",
        },
        JWT_SECRET_KEY: {
          type: "string",
          default: "secret",
          },
        NODE_ENV: {
          type: "string",
          default: "production",
        },
      },
    },
  });
});
