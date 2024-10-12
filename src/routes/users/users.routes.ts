import { FastifyInstance} from "fastify";
import { UserSchema, UserSchemaResponse, UserSchemaType } from "./users.schema";
import { CreateUserController } from "./users.controller";

export default async (fastify: FastifyInstance) => {

  fastify.post<{ Body: UserSchemaType }>(
    "/",
    {
      onRequest: [fastify.authenticate],
      schema: {
        tags: ["Users"],
        summary: "Create User",
        description: "Create a new user",
        security: [{ bearerAuth: [] }],
        body: UserSchema,
        response: {
          201: UserSchemaResponse,
          500: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    CreateUserController
  );
};
