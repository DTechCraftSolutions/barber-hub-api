import { BarberRepository } from "@/repositories/barber-repository";
import { ProfessionalRepository } from "@/repositories/professional-repository";
import { Professional } from "@prisma/client";

interface GetAllProfessionalsUseCaseRequest {
  barberShopId: string;
}

interface GetAllProfessionalsUseCaseResponse {
  professionals: {
    id: Professional["id"];
    name: Professional["name"];
    email: Professional["email"];
    phone: Professional["phone"];
    role: Professional["role"];
  }[];
}

export class GetAllProfessionalsUseCase {
  constructor(
    private professionalRepository: ProfessionalRepository,
    private barberRepository: BarberRepository
  ) {}
  async execute({
    barberShopId,
  }: GetAllProfessionalsUseCaseRequest): Promise<GetAllProfessionalsUseCaseResponse> {
    const barber = await this.barberRepository.findById(barberShopId);
    if (!barber) {
      throw new Error("Barber not found");
    }

    const professionals = await this.professionalRepository.findAll(
      barberShopId
    );

    if (!professionals) {
      throw new Error("Professionals not found");
    }

    return { professionals };
  }
}
