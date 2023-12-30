import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaBarbersRepository } from "@/repositories/prisma/barber-repository";
import { PrismaProfessionalRepository } from "@/repositories/prisma/professional-repository";
import { RegisterProfessionalUseCase } from "@/use-cases/register-professional";
import { RegisterBarberUseCase } from "@/use-cases/register-barber";

interface RegisterProfessionalRequestBody {
  nameBarber: string;
  name: string;
  phone: string;
  email: string;
  password_hash: string;
  role: "ADMIN" | "WORKER";
  cpf: string;
  address: string;
  city: string;
  plan: string;
  logo_url: string;
  available_times: string[];
}

const registerProfessionalBodySchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  password_hash: z.string(),
  role: z.enum(["ADMIN", "WORKER"]),
  cpf: z.string().refine((cpf) => cpf.length === 11, {
    message: "CPF must have 11 digits",
  }),
  address: z.string(),
  city: z.string(),
  plan: z.string(),
  logo_url: z.string().url(),
  nameBarber: z.string(),
  available_times: z.array(z.string()),
});

export async function registerProfessional(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const requestBody: RegisterProfessionalRequestBody =
      registerProfessionalBodySchema.parse(request.body);

    const professionalsRepository = new PrismaProfessionalRepository();
    const barberRepository = new PrismaBarbersRepository();

    const registerBarberUseCase = new RegisterBarberUseCase(barberRepository);
    const registerProfessionalUseCase = new RegisterProfessionalUseCase(
      professionalsRepository,
      registerBarberUseCase
    );

    await registerProfessionalUseCase.execute(requestBody);

    return reply.status(201).send();
  } catch (error: any) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ validationError: error.errors });
    } else if (error.code === "P2002" && error.meta?.target?.includes("cpf")) {
      return reply.status(409).send({ error: "Duplicate CPF detected" });
    } else {
      return reply.status(409).send({
        error: error instanceof Error ? error.message : "Registration failed",
      });
    }
  }
}
