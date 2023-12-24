import { RateRepository } from "@/repositories/rate-repository";
import { Rate } from "@prisma/client";

interface UpdateRateUseCaseRequest {
  id: string;
  amount?: number;
}

interface UpdateRateUseCaseResponse {
  rate: Rate;
}

export class UpdateRateUseCase {
  constructor(private rateRepository: RateRepository) {}

  async execute({
    id,
    amount,
  }: UpdateRateUseCaseRequest): Promise<UpdateRateUseCaseResponse> {
    const rate = await this.rateRepository.findById(id);

    if (!rate) {
      throw new Error("Rate not found");
    }

    if (amount !== undefined) rate.amount = amount;

    const updatedRate = await this.rateRepository.update(rate);

    return {
      rate: updatedRate,
    };
  }
}
