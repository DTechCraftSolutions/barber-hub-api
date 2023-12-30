import { ServiceRepository } from "@/repositories/services-repository";
import { Service, User } from "@prisma/client";
import { hash } from "bcrypt";

interface UpdateServiceCaseRequest {
  id: string;
  name?: string;
  price_cents?: number;
}

interface UpdateServiceCaseResponse {
  service: Service;
}

export class UpdateServiceUseCase {
  constructor(private servicesRepository: ServiceRepository) {}

  async execute({
    id,
    name,
    price_cents,
  }: UpdateServiceCaseRequest): Promise<UpdateServiceCaseResponse> {
    const service = await this.servicesRepository.findById(id);

    if (!service) {
      throw new Error("Service not found");
    }

    if (name) service.name = name;
    if (price_cents) service.price_cents = price_cents;

    const updatedUser = await this.servicesRepository.update(service);

    return {
      service: updatedUser,
    };
  }
}
