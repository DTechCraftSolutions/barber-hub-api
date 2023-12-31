import { BarberRepository } from "@/repositories/barber-repository";
import { ProfessionalRepository } from "@/repositories/professional-repository";
import { BarberShop, Professional } from "@prisma/client";
interface ProfileProfessionalsRequest {
  id: string;
}
interface ProfileProfessionalsResponse {
  professionals: Professional;
  barber: BarberShop;
}
export class ProfileProfessionals {
  constructor(
    private professionalsRepository: ProfessionalRepository,
    private barberRepository: BarberRepository
  ) {}
  async execute({
    id,
  }: ProfileProfessionalsRequest): Promise<ProfileProfessionalsResponse> {
    const professional = await this.professionalsRepository.findById(id);
    if (!professional) {
      throw new Error("Professional not found");
    }
    const barber = await this.barberRepository.findById(
      professional.barberShopId as string
    );
    if (!barber) {
      throw new Error("Barber not found");
    }
    return {
      professionals: professional,
      barber: barber,
    };
  }
}
