import { BarberRepository } from "@/repositories/barber-repository";
import { BarberShop } from "@prisma/client";

interface RegisterBarberUseCaseRequest {
  cpf: string;
  logo_url: string;
  name: string;
  address: string;
  city: string;
  plan: string;
  available_times: string[];
}

interface RegisterBarberUseCaseResponse {
  barber: BarberShop;
}

export class RegisterBarberUseCase {
  constructor(private barberRepository: BarberRepository) {}

  async execute({
    address,
    city,
    name,
    logo_url,
    plan,
    cpf,
  }: RegisterBarberUseCaseRequest): Promise<RegisterBarberUseCaseResponse> {
    const barber = await this.barberRepository.create({
      address,
      city,
      name,
      logo_url,
      plan,
      cpf,
    });

    return { barber };
  }
}
