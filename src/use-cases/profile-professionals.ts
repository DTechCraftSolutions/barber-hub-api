import { ProfessionalRepository } from "@/repositories/professional-repository";
import { Professional } from "@prisma/client";
interface ProfileProfessionalsRequest {
  id: string;
}
interface ProfileProfessionalsResponse {
  professionals: {
    id: Professional["id"];
    name: Professional["name"];
    email: Professional["email"];
    phone: Professional["phone"];
  };
}
export class ProfileProfessionals {
  constructor(
    private readonly professionalsRepository: ProfessionalRepository
  ) {}
  async execute({
    id,
  }: ProfileProfessionalsRequest): Promise<ProfileProfessionalsResponse> {
    const professional = await this.professionalsRepository.findById(id);
    if (!professional) {
      throw new Error("Professional not found");
    }
    return {
      professionals: {
        id: professional.id,
        name: professional.name,
        email: professional.email,
        phone: professional.phone,
      },
    };
  }
}
