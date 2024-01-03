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
    var availableTimes: AvailableTime[] = [];

    // Assumindo que as strings de tempo estão no formato HH:mm
    const startHours = parseInt(initial_time.split(":")[0]);
    const startMinutes = parseInt(initial_time.split(":")[1]);

    const endHours = parseInt(end_time.split(":")[0]);
    const endMinutes = parseInt(end_time.split(":")[1]);

    const startTime = new Date(1970, 0, 1, startHours, startMinutes);
    const endTime = new Date(1970, 0, 1, endHours, endMinutes);

    const interval = 30 * 60 * 1000; // 30 minutos em milissegundos

    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);

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

      console.log("Inside loop at:", currentTime);
      console.log(
        "initial_time:",
        initial_time,
        "end_time:",
        end_time,
        "_label:",
        _label
      );

      const createdAvailableTime = await this.availableTimesRepository.create({
        initial_time: currentTime,
        end_time: new Date(currentTime.getTime() + interval),
        label: _label,
        barber_shops: { connect: { id: barberShopId } },
      });

      availableTimes.push(createdAvailableTime);
    }

    console.log("availableTimes:", availableTimes);

    return {
      availableTimes,
    };
  }
}
