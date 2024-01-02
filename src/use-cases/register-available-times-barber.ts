import { AvailableTimeRepository } from "@/repositories/available-times-repository";
import { AvailableTime } from "@prisma/client";

interface RegisterAvailableTimesBarberUseCaseRequest {
  initial_time: string;
  end_time: string;
  barberShopId: string;
}

interface RegisterAvailableTimesBarberUseCaseResponse {
  availableTimes: AvailableTime[];
}

export class RegisterAvailableTimesBarberUseCase {
  constructor(private availableTimesRepository: AvailableTimeRepository) {}

  async execute({
    barberShopId,
    initial_time,
    end_time,
  }: RegisterAvailableTimesBarberUseCaseRequest): Promise<RegisterAvailableTimesBarberUseCaseResponse> {
    const availableTimes: AvailableTime[] = [];
    const startTime = new Date(`1970-01-01T${initial_time}`);
    const endTime = new Date(`1970-01-01T${end_time}`);
    const interval = 30 * 60 * 1000; // 30 minutes in milliseconds

    for (
      let currentTime = startTime;
      currentTime <= endTime;
      currentTime.setTime(currentTime.getTime() + interval)
    ) {
      const label = currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const createdAvailableTime = await this.availableTimesRepository.create({
        label,
        barberShop: { connect: { id: barberShopId } },
      });
      availableTimes.push(createdAvailableTime);
    }

    return {
      availableTimes,
    };
  }
}
