import { FastifyInstance } from "fastify";
import userRoutes from "./users/users.routes";

export default async(fastify: FastifyInstance) => {
  fastify.register(userRoutes, { prefix: "/users" });
}


