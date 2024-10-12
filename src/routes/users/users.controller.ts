import { FastifyReply, FastifyRequest } from "fastify";
import { UserSchemaType } from "./users.schema";
import { Users } from "../../models/users.models";
import bcrypt from "bcryptjs";

export const CreateUserController = async (
  request: FastifyRequest<{ Body: UserSchemaType }>,
  reply: FastifyReply
) => {
  try {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    const user = await Users.create({
      ...request.body,
      status: "active",
      user_role: "customer",
      signup_date: new Date(),
      last_login: new Date(),
      password: hashedPassword,
    });
    return reply.status(201).send(user);
  } catch (error) {
    request.log.error(error);
    return reply.internalServerError(
      (error as Error)?.message || "Internal Server Error"
    );
  }
};
