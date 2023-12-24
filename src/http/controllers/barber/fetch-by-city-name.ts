import { PrismaBarbersRepository } from "@/repositories/prisma/barber-repository";
import { FetchAllBarberUseCase } from "@/use-cases/fetch-all-barbers";
import { FetchCityNameBarberUseCase } from "@/use-cases/fetch-barber-city-name";
import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";

const fetchByCityNameParamsSchema = z.object({
  city: z.string(),
  name: z.string(),
});

export async function fetchByCityName(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { city, name } = fetchByCityNameParamsSchema.parse(request.params);

    const barbersRepository = new PrismaBarbersRepository();
    const fetchByCityNameBarbersUseCase = new FetchCityNameBarberUseCase(
      barbersRepository
    );

    const barbers = await fetchByCityNameBarbersUseCase.execute({
      city,
      name,
    });
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
