import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt from "fastify-jwt";
import fastifyPlugin from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}
export const jwtSetup = fastifyPlugin(async (fastify: FastifyInstance) => {
  await fastify.register(fastifyJwt, {
    secret: fastify.config.JWT_SECRET_KEY,
  });
  fastify.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (error) {
        return reply.send(error);
      }
    }
  );
});
