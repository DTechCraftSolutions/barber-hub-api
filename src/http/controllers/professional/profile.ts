import { PrismaProfessionalRepository } from "@/repositories/prisma/professional-repository";
import { ProfileProfessionals } from "@/use-cases/profile-professionals";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  try {
    const professionalRepository = new PrismaProfessionalRepository();
    const profileProfessionalUseCase = new ProfileProfessionals(
      professionalRepository
    );

    const { professionals } = await profileProfessionalUseCase.execute({
      id: request.user.sub,
    });

    return reply.status(200).send({ professionals });
  } catch (error) {
    return reply.status(401).send({
      error: error instanceof Error ? error.message : "Profile failed",
    });
  }
}
