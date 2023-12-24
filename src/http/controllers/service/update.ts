import { PrismaServicesRepository } from "@/repositories/prisma/services-repository";
import { UpdateServiceUseCase } from "@/use-cases/update-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    needed_time_minutes: z.number().optional(),
    price_cents: z.number().optional(),
  });

  try {
    const { id, name, needed_time_minutes, price_cents } =
      updateBodySchema.parse(request.body);

    const ServiceRepository = new PrismaServicesRepository();
    const updateServiceUseCase = new UpdateServiceUseCase(ServiceRepository);

    await updateServiceUseCase.execute({
      id,
      name,
      needed_time_minutes,
      price_cents,
    });

    return reply.status(200).send();
  } catch (err) {
    return reply.status(400).send({ error: err });
  }
}
