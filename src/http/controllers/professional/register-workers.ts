import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaBarbersRepository } from "@/repositories/prisma/barber-repository";
import { PrismaProfessionalRepository } from "@/repositories/prisma/professional-repository";
import { RegisterProfessionalUseCase } from "@/use-cases/register-professional";
import { RegisterBarberUseCase } from "@/use-cases/register-barber";
import { RegisterProfessionalsWorkersUseCase } from "@/use-cases/register-profissionals-workers";

interface RegisterProfessionalRequestBody {
  idAdmin: string;
  name: string;
  phone: string;
  email: string;
  password_hash: string;
  role: "WORKER";
  barberShopId: string;
}

const registerProfessionalBodySchema = z.object({
  idAdmin: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  password_hash: z.string(),
  role: z.enum(["WORKER"]),
  barberShopId: z.string(),
});

export async function registerProfessionalWorkers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const requestBody: RegisterProfessionalRequestBody =
      registerProfessionalBodySchema.parse(request.body);

    const professionalsRepository = new PrismaProfessionalRepository();
    const registerProfessionalWorkersUseCase =
      new RegisterProfessionalsWorkersUseCase(professionalsRepository);

    await registerProfessionalWorkersUseCase.execute(requestBody);

    return reply.status(201).send();
  } catch (error: any) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ validationError: error.errors });
    }
    return reply.status(409).send({
      error: error instanceof Error ? error.message : "Registration failed",
    });
  }
}
