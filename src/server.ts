import Fastify from "fastify";
import sensible from "@fastify/sensible";
import cors from "@fastify/cors";
import routes from "./routes";
import { swaggerSetup, EnvSetup, DatabaseSetup } from "./plugins";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { jwtSetup } from "./plugins/jwt";

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

const starter = async () => {
  try {
    await fastify.register(sensible);
    await fastify.register(cors)
    fastify.withTypeProvider<TypeBoxTypeProvider>();
    await fastify.register(EnvSetup);
    await fastify.register(DatabaseSetup);
    await fastify.register(swaggerSetup);
    await fastify.register(jwtSetup);
    await fastify.register(routes, { prefix: "/api" });

    await fastify.listen({ port: Number(fastify.config.PORT) });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

starter();


// graceful shutdown
const listeners = ['SIGINT', 'SIGTERM']
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await fastify.close()
    process.exit(0)
  })
})