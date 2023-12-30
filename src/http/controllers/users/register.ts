import { PrismaUsersRepository } from "@/repositories/prisma/users-repository";
import { RegisterUserUseCase } from "@/use-cases/register-user";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string(),
  });

  const { name, email, password, phone } = registerBodySchema.parse(
    request.body
  );

  try {
    const usersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUserUseCase(usersRepository);

    await registerUseCase.execute({
      name,
      email,
      password,
      phone,
    });
  } catch (err) {
    return reply.status(409).send({ error: err });
  }

  return reply.status(201).send();
}
