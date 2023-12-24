import { BarberRepository } from "@/repositories/barber-repository";
import { RateRepository } from "@/repositories/rate-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { Rate } from "@prisma/client";

interface RegisterRateUseCaseRequest {
  amount: number;
  userId: string;
  barberShopId: string;
}

interface RegisterRateUseCaseResponse {
  rate: Rate;
}

export class RegisterRateUseCase {
  constructor(
    private rateRepository: RateRepository,
    private barberRepository: BarberRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    amount,
    userId,
    barberShopId,
  }: RegisterRateUseCaseRequest): Promise<RegisterRateUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const barberShop = await this.barberRepository.findById(barberShopId);

    if (!barberShop) {
      throw new Error("Barber shop not found");
    }

    const rate = await this.rateRepository.create({
      amount,
      barber_shop: { connect: { id: barberShop.id } },
      users: { connect: { id: user.id } },
    });

    return { rate };
  }
}
