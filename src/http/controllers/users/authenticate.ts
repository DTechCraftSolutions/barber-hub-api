import { PrismaUsersRepository } from "@/repositories/prisma/users-repository";
import { AuthenticateUserUseCase } from "@/use-cases/authenticate-user";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  try {
    const { email, password } = authenticateBodySchema.parse(request.body);

    const usersRepository = new PrismaUsersRepository();
    const authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepository
    );

    const { user } = await authenticateUserUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign({
      sign: {
        sub: user.id,
      },
    });

    const refreshToken = await reply.jwtSign({
      sign: {
        sub: user.id,
        expiresIn: "30d",
      },
    });

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      });
  } catch (error) {
    return reply.status(401).send({
      error: error instanceof Error ? error.message : "Authentication failed",
    });
  }
}
