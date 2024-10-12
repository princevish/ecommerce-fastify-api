import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { Sequelize } from "sequelize-typescript";
import Models from "../models";

declare module "fastify" {
  interface FastifyInstance {
    sequelize: Sequelize;
  }
}

export const DatabaseSetup = fastifyPlugin(async (fastify: FastifyInstance) => {
  fastify.log.info("Connecting to database...");
  const sequelize = new Sequelize({
    dialect: fastify.config.DATABASE_DIALECT,
    host: fastify.config.DATABASE_HOST,
    port: Number(fastify.config.DATABASE_PORT),
    username: fastify.config.DATABASE_USERNAME,
    password: fastify.config.DATABASE_PASSWORD,
    database: fastify.config.DATABASE_NAME,
    models: Models,
  });

  await sequelize.authenticate();
  fastify.log.info("Connection has been established successfully.");

  fastify.decorate("sequelize", sequelize);

  if (fastify.config.NODE_ENV === "development") {
    await fastify.sequelize.sync({ force: true });
  }


  fastify.addHook("onClose", async (fastify) => {
    fastify.log.info("Closing database connection...");
    await sequelize.close();
  });
});
