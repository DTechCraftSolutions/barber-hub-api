import { PrismaBarbersRepository } from "@/repositories/prisma/barber-repository";
import { PrismaRateRepository } from "@/repositories/prisma/rate-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/users-repository";
import { RegisterRateUseCase } from "@/use-cases/register-rate";
import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";

const registerBodySchema = z.object({
  amount: z.number(),
  userId: z.string(),
  barberShopId: z.string(),
});

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { amount, userId, barberShopId } = registerBodySchema.parse(
      request.body
    );

    const rateRepository = new PrismaRateRepository();
    const barberRepository = new PrismaBarbersRepository();
    const usersRepository = new PrismaUsersRepository();

    const registerRateUseCase = new RegisterRateUseCase(
      rateRepository,
      barberRepository,
      usersRepository
    );

    const { rate } = await registerRateUseCase.execute({
      amount,
      userId,
      barberShopId,
    });

    return reply.status(201).send({ rate });
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ validationError: error.errors });
    }

    return reply.status(500).send({
      error: error instanceof Error ? error.message : "Registration failed",
    });
  }
}
