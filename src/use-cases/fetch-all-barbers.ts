import { BarberRepository } from "@/repositories/barber-repository";
import { BarberShop } from "@prisma/client";

interface FetchBarberUseCaseResponse {
  barbers: BarberShop[];
}

export class FetchAllBarberUseCase {
  constructor(private barberRepository: BarberRepository) {}

  async execute(): Promise<FetchBarberUseCaseResponse> {
    const barbers = await this.barberRepository.fetchAll();
    return {
      barbers,
    };
  }
}
