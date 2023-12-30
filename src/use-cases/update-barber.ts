import { BarberRepository } from "@/repositories/barber-repository";
import { ProfessionalRepository } from "@/repositories/professional-repository";
import { BarberShop } from "@prisma/client";

interface UpdateBarberCaseRequest {
  idAdmin: string;
  id: string;
  cpf?: string;
  logo_url?: string;
  name?: string;
  address?: string;
  city?: string;
  plan?: string;
  available_times?: string[];
}

interface UpdateBarberCaseResponse {
  barber: BarberShop;
}

export class UpdateBarberUseCase {
  constructor(
    private barberRepository: BarberRepository,
    private professionalRepository: ProfessionalRepository
  ) {}

  async execute({
    id,
    idAdmin,
    name,
    address,
    city,
    plan,
    logo_url,
    cpf,
    available_times,
  }: UpdateBarberCaseRequest): Promise<UpdateBarberCaseResponse> {
    const professional = await this.professionalRepository.findById(idAdmin);
    if (!professional || professional.role !== "ADMIN") {
      throw new Error("Admin professional not found or not authorized");
    }
    id = professional.barberShopId as string;
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
    if (available_times) barber.available_times = available_times;

    const updatedBarber = await this.barberRepository.update(barber);

    return {
      barber: updatedBarber,
    };
  }
}
