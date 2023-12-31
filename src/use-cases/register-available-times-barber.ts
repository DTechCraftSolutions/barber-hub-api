import { AvailableTimeRepository } from "@/repositories/available-times-repository";
import { AvailableTime } from "@prisma/client";

interface RegisterAvailableTimesBarberUseCaseRequest {
  label: string;
  barberShopId: string;
}

interface RegisterAvailableTimesBarberUseCaseResponse {
  availableTimes: AvailableTime;
}
export class RegisterAvailableTimesBarberUseCase {
  constructor(private availableTimesRepository: AvailableTimeRepository) {}

  async execute({
    label,
    barberShopId,
  }: RegisterAvailableTimesBarberUseCaseRequest): Promise<RegisterAvailableTimesBarberUseCaseResponse> {
    const availableTimes = await this.availableTimesRepository.create({
      label,
      barberShop: { connect: { id: barberShopId } },
    });
    return {
      availableTimes,
    };
  }
}
