import { PrismaBarbersRepository } from "@/repositories/prisma/barber-repository";
import { PrismaProfessionalRepository } from "@/repositories/prisma/professional-repository";
import { UpdateProfessionalAdmUseCase } from "@/use-cases/update-professional-adm";
import { UpdateProfessionalsWorkersUseCase } from "@/use-cases/update-professionals-workers";
import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";

const registerBodySchema = z.object({
  idAdmin: z.string(),
  id: z.string(),
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  password_hash: z.string().optional(),
});

export async function updateWorkers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { idAdmin, name, phone, email, password_hash, id } =
      registerBodySchema.parse(request.body);

    const professionalRepository = new PrismaProfessionalRepository();
    const updateProfessionaWorkerslUseCase =
      new UpdateProfessionalsWorkersUseCase(professionalRepository);

    await updateProfessionaWorkerslUseCase.execute({
      idAdmin,
      id,
      email,
      name,
      password_hash,
      phone,
    });

    return reply.status(200).send();
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ validationError: error.errors });
    }

    return reply.status(500).send({
      error: error instanceof Error ? error.message : "Update failed",
    });
  }
}
