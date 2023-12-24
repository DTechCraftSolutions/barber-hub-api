import { PrismaBarbersRepository } from "@/repositories/prisma/barber-repository";
import { UpdateBarberUseCase } from "@/use-cases/update-barber";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    plan: z.string().optional(),
    cpf: z.string().optional(),
    logo_url: z.string().optional(),
  });

  try {
    const { id, name, address, city, plan, cpf, logo_url } =
      updateBodySchema.parse(request.body);

    const barberRepository = new PrismaBarbersRepository();
    const updateBarberUseCase = new UpdateBarberUseCase(barberRepository);

    await updateBarberUseCase.execute({
      id,
      address,
      city,
      cpf,
      logo_url,
      name,
      plan,
    });

    return reply.status(200).send();
  } catch (err) {
    return reply.status(400).send({ error: err });
  }
}
