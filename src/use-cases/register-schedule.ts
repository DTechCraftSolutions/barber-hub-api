import { BarberRepository } from "@/repositories/barber-repository";
import { ScheduleRepository } from "@/repositories/schedule-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { Schedule } from "@prisma/client";

interface RegisterScheduleUseCaseRequest {
  date: string;
  serviceId: string;
  barberShopId: string;
  professionalId: string;
  userId: string;
  availableTimeId: string;
}

interface RegisterScheduleUseCaseResponse {
  schedule: Schedule;
}
export class RegisterScheduleUseCase {
  constructor(
    private scheduleRepository: ScheduleRepository,
    private usersRepository: UsersRepository,
    private barberRepository: BarberRepository
  ) {}
  async execute({
    date,
    serviceId,
    barberShopId,
    professionalId,
    userId,
    availableTimeId,
  }: RegisterScheduleUseCaseRequest): Promise<RegisterScheduleUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const barberShop = await this.barberRepository.findById(barberShopId);
    if (!barberShop) {
      throw new Error("Barber shop not found");
    }

    const schedule = await this.scheduleRepository.create({
      date: new Date(date),
      services: { connect: { id: serviceId } },
      barber_shop: { connect: { id: barberShop.id } },
      users: { connect: { id: user.id } },
      professionals: { connect: { id: professionalId } },
      clientPhone: user.phone,
      availableTime: { connect: { id: availableTimeId } },
    });

    return {
      schedule,
    };
  }
}
