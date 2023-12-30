import { PrismaBarbersRepository } from "@/repositories/prisma/barber-repository";
import { PrismaProfessionalRepository } from "@/repositories/prisma/professional-repository";
import { UpdateBarberUseCase } from "@/use-cases/update-barber";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    idAdmin: z.string(),
    id: z.string(),
    name: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    plan: z.string().optional(),
    cpf: z.string().optional(),
    logo_url: z.string().optional(),
    available_times: z.array(z.string()).optional(),
  });

  try {
    const {
      id,
      idAdmin,
      name,
      address,
      city,
      plan,
      cpf,
      logo_url,
      available_times,
    } = updateBodySchema.parse(request.body);

    const barberRepository = new PrismaBarbersRepository();
    const professionalRepository = new PrismaProfessionalRepository();
    const updateBarberUseCase = new UpdateBarberUseCase(
      barberRepository,
      professionalRepository
    );

    await updateBarberUseCase.execute({
      idAdmin,
      id,
      address,
      city,
      cpf,
      logo_url,
      name,
      plan,
      available_times,
    });

    return reply.status(200).send();
  } catch (err) {
    return reply.status(400).send({ error: err });
  }
}
