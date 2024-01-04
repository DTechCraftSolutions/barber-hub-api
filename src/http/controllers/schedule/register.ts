import { PrismaBarbersRepository } from "@/repositories/prisma/barber-repository";
import { PrismaScheduleRepository } from "@/repositories/prisma/schedule-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/users-repository";
import { RegisterScheduleUseCase } from "@/use-cases/register-schedule";
import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";

const registerBodySchema = z.object({
  date: z.string(),
  serviceId: z.string(),
  barberShopId: z.string(),
  userId: z.string(),
  professionalId: z.string(),
  availableTimeId: z.string(),
});

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const {
      date,
      barberShopId,
      serviceId,
      userId,
      professionalId,
      availableTimeId,
    } = registerBodySchema.parse(request.body);

    const scheduleRepository = new PrismaScheduleRepository();
    const barberRepository = new PrismaBarbersRepository();
    const userRepository = new PrismaUsersRepository();
    const sheduleRegisterUseCase = new RegisterScheduleUseCase(
      scheduleRepository,
      userRepository,
      barberRepository
    );

    const { schedule } = await sheduleRegisterUseCase.execute({
      date,
      serviceId,
      barberShopId,
      userId,
      professionalId,
      availableTimeId,
    });

    return reply.status(201).send({ schedule });
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ validationError: error.errors });
    }

    return reply.status(500).send({
      error: error instanceof Error ? error.message : "Registration failed",
    });
  }
}
