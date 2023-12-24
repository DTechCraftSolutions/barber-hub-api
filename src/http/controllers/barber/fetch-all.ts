import { PrismaBarbersRepository } from "@/repositories/prisma/barber-repository";
import { FetchAllBarberUseCase } from "@/use-cases/fetch-all-barbers";
import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";

export async function fetchAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const barbersRepository = new PrismaBarbersRepository();
    const fetchAllBarbersUseCase = new FetchAllBarberUseCase(barbersRepository);

    const barbers = await fetchAllBarbersUseCase.execute();
    return reply.status(200).send({ barbers });
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ validationError: error.errors });
    }

    return reply.status(500).send({
      error: error instanceof Error ? error.message : "Fetching failed",
    });
  }
}
