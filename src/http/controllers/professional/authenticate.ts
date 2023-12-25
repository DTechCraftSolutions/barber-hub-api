import { PrismaBarbersRepository } from "@/repositories/prisma/barber-repository";
import { PrismaProfessionalRepository } from "@/repositories/prisma/professional-repository";
import { AuthenticateProfessionalsUseCase } from "@/use-cases/authenticate-professionals";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticateProfessional(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  try {
    const { email, password } = authenticateBodySchema.parse(request.body);

    const profissionalsRepository = new PrismaProfessionalRepository();
    const barberRepository = new PrismaBarbersRepository();
    const authenticateProfessionalUseCase =
      new AuthenticateProfessionalsUseCase(
        profissionalsRepository,
        barberRepository
      );

    const { professional } = await authenticateProfessionalUseCase.execute({
      email,
      password,
    });

    return reply.status(200).send({ professional });
  } catch (error) {
    return reply.status(401).send({
      error: error instanceof Error ? error.message : "Authentication failed",
    });
  }
}
