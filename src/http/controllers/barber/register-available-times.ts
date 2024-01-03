import { PrismaAvailableTimeRepository } from "@/repositories/prisma/available-times-repository";
import { RegisterAvailableTimesBarberUseCase } from "@/use-cases/register-available-times-barber";
import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";

const registerBodySchema = z.object({
  initial_time: z.string(),
  end_time: z.string(),
  day_of_week: z.string(),
  barberShopId: z.string(),
});

export async function registerAvailableTimes(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { initial_time, end_time, day_of_week, barberShopId } =
      registerBodySchema.parse(request.body);

    const available_timesRepository = new PrismaAvailableTimeRepository();
    const registerAvailableTimeUseCase =
      new RegisterAvailableTimesBarberUseCase(available_timesRepository);

    await registerAvailableTimeUseCase.execute({
      initial_time,
      end_time,
      day_of_week,
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
