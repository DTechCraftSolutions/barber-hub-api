import { BarberRepository } from "@/repositories/barber-repository";
import { BarberShop } from "@prisma/client";

interface FetchBarberUseCaseRequest {
  city: string;
  name: string;
}
interface FetchBarberUseCaseResponse {
  barbers: BarberShop[];
}

export class FetchCityNameBarberUseCase {
  constructor(private barberRepository: BarberRepository) {}

  async execute({
    city,
    name,
  }: FetchBarberUseCaseRequest): Promise<FetchBarberUseCaseResponse> {
    const barbers = await this.barberRepository.fetchByCityAndName(city, name);
    return {
      barbers,
    };
  }
}
