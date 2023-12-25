import { ProfessionalRepository } from "@/repositories/professional-repository";
import { Professional } from "@prisma/client";
import { hash } from "bcrypt";

interface RegisterProfessionalsWorkersUseCaseRequest {
  idAdmin: string;
  name: string;
  phone: string;
  email: string;
  password_hash: string;
  role: "WORKER";
  barberShopId: string;
}

interface RegisterProfessionalsWorkersUseCaseResponse {
  professional: Professional;
}

export class RegisterProfessionalsWorkersUseCase {
  constructor(private professionalRepository: ProfessionalRepository) {}

  async execute({
    idAdmin,
    name,
    email,
    phone,
    password_hash,
    role,
    barberShopId,
  }: RegisterProfessionalsWorkersUseCaseRequest): Promise<RegisterProfessionalsWorkersUseCaseResponse> {
    const adminProfessional = await this.professionalRepository.findById(
      idAdmin
    );

    if (!adminProfessional || adminProfessional.role !== "ADMIN") {
      throw new Error("Admin professional not found or not authorized");
    }

    barberShopId = adminProfessional.barberShopId as string;

    const password_hashed = await hash(password_hash, 6);

    const professionalData = {
      name,
      email,
      password_hash: password_hashed,
      phone,
      role,
      BarberShop: {
        connect: {
          id: barberShopId,
        },
      },
    };

    const createdProfessional = await this.professionalRepository.create(
      professionalData
    );

    return {
      professional: createdProfessional,
    };
  }
}
