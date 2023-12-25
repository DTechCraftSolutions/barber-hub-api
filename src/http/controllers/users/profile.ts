import { PrismaUsersRepository } from "@/repositories/prisma/users-repository";
import { AuthenticateUserUseCase } from "@/use-cases/authenticate-user";
import { ProfileUserUseCase } from "@/use-cases/profile-user";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  try {
    const usersRepository = new PrismaUsersRepository();
    const profileUserUseCase = new ProfileUserUseCase(usersRepository);

    const { user } = await profileUserUseCase.execute({
      id: request.user.sub,
    });

    return reply.status(200).send({ user });
  } catch (error) {
    return reply.status(401).send({
      error: error instanceof Error ? error.message : "Profile failed",
    });
  }
}
