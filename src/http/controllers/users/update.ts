import { PrismaUsersRepository } from "@/repositories/prisma/users-repository";
import { UpdateUserUseCase } from "@/use-cases/update-user";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    phone: z.string().optional(),
  });

  try {
    const { name, email, password, phone } = updateBodySchema.parse(
      request.body
    );
    const { id } = updateBodySchema.parse(request.params);

    const usersRepository = new PrismaUsersRepository();
    const updateUserUseCase = new UpdateUserUseCase(usersRepository);

    await updateUserUseCase.execute({
      id,
      name,
      email,
      password,
      phone,
    });

    return reply.status(200).send();
  } catch (err) {
    return reply.status(400).send({ error: err });
  }
}
