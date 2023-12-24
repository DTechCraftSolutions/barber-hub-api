import { PrismaBarbersRepository } from "@/repositories/prisma/barber-repository";
import { PrismaServicesRepository } from "@/repositories/prisma/services-repository";
import { RegisterServiceUseCase } from "@/use-cases/register-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";

const registerBodySchema = z.object({
  barberShopId: z.string(),
  name: z.string(),
  needed_time_minutes: z.number(),
  price_cents: z.number(),
});

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, barberShopId, needed_time_minutes, price_cents } =
      registerBodySchema.parse(request.body);

    const servicesRepository = new PrismaServicesRepository();
    const barberRepository = new PrismaBarbersRepository();
    const registerServiceUseCase = new RegisterServiceUseCase(
      servicesRepository,
      barberRepository
    );

    await registerServiceUseCase.execute({
      barberShopId,
      name,
      needed_time_minutes,
      price_cents,
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
