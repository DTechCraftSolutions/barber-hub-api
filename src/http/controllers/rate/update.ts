import { PrismaRateRepository } from "@/repositories/prisma/rate-repository";
import { UpdateRateUseCase } from "@/use-cases/update-rate";
import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";

const updateRateBodySchema = z.object({
  id: z.string(),
  amount: z.number().optional(),
});

export async function updateRate(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id, amount } = updateRateBodySchema.parse(request.body);

    const rateRepository = new PrismaRateRepository();
    const updateRateUseCase = new UpdateRateUseCase(rateRepository);

    const { rate } = await updateRateUseCase.execute({
      id,
      amount,
    });

    return reply.status(200).send({ rate });
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ validationError: error.errors });
    }

    return reply.status(500).send({
      error: error instanceof Error ? error.message : "Update failed",
    });
  }
}
