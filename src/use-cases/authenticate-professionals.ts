import { BarberRepository } from "@/repositories/barber-repository";
import { ProfessionalRepository } from "@/repositories/professional-repository";
import { BarberShop } from "@prisma/client";
import { compare } from "bcrypt";

interface AuthenticateProfessionalsUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateProfessionalsUseCaseResponse {
  professional: {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "WORKER";
    barbershop?: BarberShop;
  };
}

export class AuthenticateProfessionalsUseCase {
  constructor(
    private professionalRepository: ProfessionalRepository,
    private barberRepository: BarberRepository
  ) {}
  async execute({
    email,
    password,
  }: AuthenticateProfessionalsUseCaseRequest): Promise<AuthenticateProfessionalsUseCaseResponse> {
    const professional = await this.professionalRepository.findByEmail(email);
    if (!professional) {
      throw new Error("Professional not found");
    }

    const passwordMatch = await compare(password, professional.password_hash);
    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    const barbershop = await this.barberRepository.findById(
      professional.id as string
    );

    if (!barbershop) {
      throw new Error("Barber shop not found");
    }

    return {
      professional: {
        id: professional.id,
        name: professional.name,
        email: professional.email,
        role: professional.role,
        barbershop: barbershop,
      },
    };
  }
}
