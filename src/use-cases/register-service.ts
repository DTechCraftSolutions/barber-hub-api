import { BarberRepository } from "@/repositories/barber-repository";
import { ServiceRepository } from "@/repositories/services-repository";
import { Service } from "@prisma/client";

interface RegisterServiceUseCaseRequest {
  name: string;
  price_cents: number;
  needed_time_minutes: number;
  barberShopId: string;
}

interface RegisterServiceUseCaseResponse {
  service: Service;
}

export class RegisterServiceUseCase {
  constructor(
    private servicesRepository: ServiceRepository,
    private barberRepository: BarberRepository
  ) {}

  async execute({
    barberShopId,
    name,
    needed_time_minutes,
    price_cents,
  }: RegisterServiceUseCaseRequest): Promise<RegisterServiceUseCaseResponse> {
    const barber = await this.barberRepository.findById(barberShopId);
    if (!barber) {
      throw new Error("Barber not found");
    }

    const service = await this.servicesRepository.create({
      name,
      needed_time_minutes,
      price_cents,
      barber_shop: { connect: { id: barber.id } },
    });

    return { service };
  }
}
