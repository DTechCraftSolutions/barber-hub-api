import { ProfessionalRepository } from "@/repositories/professional-repository";
import { Professional } from "@prisma/client";
import { hash } from "bcrypt";

interface UpdateProfessionalsWorkersUseCaseRequest {
  idAdmin: string;
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  password_hash?: string;
}

interface UpdateProfessionalsWorkersUseCaseResponse {
  professional: Professional;
}

export class UpdateProfessionalsWorkersUseCase {
  constructor(private professionalRepository: ProfessionalRepository) {}

  async execute({
    idAdmin,
    id,
    name,
    phone,
    email,
    password_hash,
  }: UpdateProfessionalsWorkersUseCaseRequest): Promise<UpdateProfessionalsWorkersUseCaseResponse> {
    const adminProfessional = await this.professionalRepository.findById(
      idAdmin
    );
    if (!adminProfessional || adminProfessional.role !== "ADMIN") {
      throw new Error("Admin professional not found or not authorized");
    }

    const professional = await this.professionalRepository.findById(id);

    if (!professional) {
      throw new Error("Professional not found");
    }
    if (name) professional.name = name;
    if (phone) professional.phone = phone;
    if (email) professional.email = email;
    if (password_hash)
      professional.password_hash = await hash(password_hash, 6);

    const updatedProfessional = await this.professionalRepository.update(
      professional
    );

    return {
      professional: updatedProfessional,
    };
  }
}
