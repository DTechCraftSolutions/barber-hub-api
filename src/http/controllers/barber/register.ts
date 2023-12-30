import { PrismaBarbersRepository } from "@/repositories/prisma/barber-repository";
import { RegisterBarberUseCase } from "@/use-cases/register-barber";
import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";

const registerBodySchema = z.object({
  name: z.string(),
  cpf: z.string().refine((cpf) => cpf.length === 11, {
    message: "CPF must have 11 digits",
  }),
  address: z.string(),
  city: z.string(),
  plan: z.string(),
  logo_url: z.string().url(),
  available_times: z.array(z.string()),
});

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, cpf, address, city, plan, logo_url, available_times } =
      registerBodySchema.parse(request.body);

    const barbersRepository = new PrismaBarbersRepository();
    const registerBarberUseCase = new RegisterBarberUseCase(barbersRepository);

    await registerBarberUseCase.execute({
      name,
      cpf,
      address,
      city,
      plan,
      logo_url,
      available_times,
    });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ validationError: error.errors });
    }

    return reply.status(409).send({
      error: error instanceof Error ? error.message : "Registration failed",
    });
  }
}
