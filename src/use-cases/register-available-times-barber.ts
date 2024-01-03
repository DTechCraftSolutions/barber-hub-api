import { AvailableTimeRepository } from "@/repositories/available-times-repository";
import { AvailableTime } from "@prisma/client";

interface RegisterAvailableTimesBarberUseCaseRequest {
  initial_time: string;
  end_time: string;
  barberShopId: string;
  day_of_week: string;
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
    day_of_week,
  }: RegisterAvailableTimesBarberUseCaseRequest): Promise<RegisterAvailableTimesBarberUseCaseResponse> {
    var availableTimes: AvailableTime[] = [];

    const startHours = parseInt(initial_time.split(":")[0]);
    const startMinutes = parseInt(initial_time.split(":")[1]);

    const endHours = parseInt(end_time.split(":")[0]);
    const endMinutes = parseInt(end_time.split(":")[1]);

    const startTime = new Date(1970, 0, 1, startHours, startMinutes);
    const endTime = new Date(1970, 0, 1, endHours, endMinutes);

    const interval = 30 * 60 * 1000; // 30 minutos em milissegundos

    for (
      let currentTime = startTime;
      currentTime <= endTime;
      currentTime.setTime(currentTime.getTime() + interval)
    ) {
      const _label = currentTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const createdAvailableTime = await this.availableTimesRepository.create({
        label: _label,
        day_of_week,
        barber_shops: { connect: { id: barberShopId } },
      });

      availableTimes.push(createdAvailableTime);
    }

    return {
      availableTimes,
    };
  }
}
