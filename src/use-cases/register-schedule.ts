import { ScheduleRepository } from "@/repositories/schedule-repository";
import { Schedule } from "@prisma/client";

interface RegisterScheduleUseCaseRequest {
  date: Date;
  serviceId: string;
  barberShopId: string;
  userId: string;
  professionalId: string;
  clientPhone: string;
}

interface RegisterScheduleUseCaseResponse {
  schedule: Schedule;
}
export class RegisterScheduleUseCase {
  constructor(private scheduleRepository: ScheduleRepository) {}
  async execute({
    date,
    serviceId,
    barberShopId,
    userId,
    professionalId,
    clientPhone,
  }: RegisterScheduleUseCaseRequest): Promise<RegisterScheduleUseCaseResponse> {
    const schedule = await this.scheduleRepository.create({
      date,
      services: { connect: { id: serviceId } },
      barber_shop: { connect: { id: barberShopId } },
      users: { connect: { id: userId } },
      professionals: { connect: { id: professionalId } },
      clientPhone: clientPhone,
    });
    return {
      schedule,
    };
  }
}
