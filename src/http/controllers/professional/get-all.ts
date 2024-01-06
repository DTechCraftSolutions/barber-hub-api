import { PrismaBarbersRepository } from "@/repositories/prisma/barber-repository";
import { PrismaProfessionalRepository } from "@/repositories/prisma/professional-repository";
import { GetAllProfessionalsUseCase } from "@/use-cases/get-all-professionals";
import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";

const registerBodySchema = z.object({
  barberShopId: z.string(),
});

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { barberShopId } = registerBodySchema.parse(request.params);

    if (!barberShopId) {
      return reply.status(400).send({ error: "Invalid barberShopId" });
    }

    const professionalRepository = new PrismaProfessionalRepository();
    const barberRepository = new PrismaBarbersRepository();
    const getAllProfessionalsUseCase = new GetAllProfessionalsUseCase(
      professionalRepository,
      barberRepository
    );

    const { professionals } = await getAllProfessionalsUseCase.execute({
      barberShopId,
    });
    const allProfessionals = professionals.map((professional) => {
      return {
        id: professional.id,
        name: professional.name,
        email: professional.email,
        phone: professional.phone,
        role: professional.role,
      };
    });
    return reply.status(200).send({ allProfessionals });
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ validationError: error.errors });
    }

    return reply.status(500).send({
      error: error instanceof Error ? error.message : "Fetching failed",
    });
  }
}
