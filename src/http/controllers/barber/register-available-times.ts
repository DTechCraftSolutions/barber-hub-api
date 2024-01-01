import { PrismaAvailableTimeRepository } from "@/repositories/prisma/available-times-repository";
import { RegisterAvailableTimesBarberUseCase } from "@/use-cases/register-available-times-barber";
import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";

const registerBodySchema = z.object({
  label: z.string(),
  barberShopId: z.string(),
});

export async function registerAvailableTimes(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { label, barberShopId } = registerBodySchema.parse(request.body);

    const available_timesRepository = new PrismaAvailableTimeRepository();
    const registerAvailableTimeUseCase =
      new RegisterAvailableTimesBarberUseCase(available_timesRepository);

    await registerAvailableTimeUseCase.execute({
      label,
      barberShopId,
    });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ validationError: error.errors });
    }

    return reply.status(409).send({
      error: error instanceof Error ? error.message : "Registration failed",
    });
  }
}
