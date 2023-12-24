import { BarberRepository } from "@/repositories/barber-repository";
import { BarberShop } from "@prisma/client";

interface UpdateBarberCaseRequest {
  id: string;
  cpf?: string;
  logo_url?: string;
  name?: string;
  address?: string;
  city?: string;
  plan?: string;
}

interface UpdateBarberCaseResponse {
  barber: BarberShop;
}

export class UpdateBarberUseCase {
  constructor(private barberRepository: BarberRepository) {}

  async execute({
    id,
    name,
    address,
    city,
    plan,
    logo_url,
    cpf,
  }: UpdateBarberCaseRequest): Promise<UpdateBarberCaseResponse> {
    const barber = await this.barberRepository.findById(id);

    if (!barber) {
      throw new Error("Barber not found");
    }

    if (name) barber.name = name;
    if (address) barber.address = address;
    if (city) barber.city = city;
    if (plan) barber.plan = plan;
    if (logo_url) barber.logo_url = logo_url;
    if (cpf) barber.cpf = cpf;

    const updatedBarber = await this.barberRepository.update(barber);

    return {
      barber: updatedBarber,
    };
  }
}
