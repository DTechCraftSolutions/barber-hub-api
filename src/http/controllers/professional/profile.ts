import { PrismaBarbersRepository } from "@/repositories/prisma/barber-repository";
import { PrismaProfessionalRepository } from "@/repositories/prisma/professional-repository";
import { ProfileProfessionals } from "@/use-cases/profile-professionals";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  try {
    const barberRepository = new PrismaBarbersRepository();
    const professionalRepository = new PrismaProfessionalRepository();
    const profileProfessionalUseCase = new ProfileProfessionals(
      professionalRepository,
      barberRepository
    );

    const { professionals, barber } = await profileProfessionalUseCase.execute({
      id: request.user.sign.sub,
    });

    return reply.status(200).send({
      professionals: {
        ...professionals,
        password_hash: undefined,
      },
      barber,
    });
  } catch (error) {
    return reply.status(401).send({
      error: error instanceof Error ? error.message : "Profile failed",
    });
  }
}
