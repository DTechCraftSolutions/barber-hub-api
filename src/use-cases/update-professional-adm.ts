import { ProfessionalRepository } from "@/repositories/professional-repository";
import { Professional } from "@prisma/client";
import { hash } from "bcrypt";

interface UpdateProfessionalAdmUseCaseRequest {
  idAdmin: string;
  name?: string;
  phone?: string;
  email?: string;
  password_hash?: string;
}

interface UpdateProfessionalAdmUseCaseResponse {
  profissional: Professional;
}

export class UpdateProfessionalAdmUseCase {
  constructor(private professionalRepository: ProfessionalRepository) {}

  async execute({
    idAdmin,
    name,
    phone,
    email,
    password_hash,
  }: UpdateProfessionalAdmUseCaseRequest): Promise<UpdateProfessionalAdmUseCaseResponse> {
    const adminProfessional = await this.professionalRepository.findById(
      idAdmin
    );

    if (!adminProfessional || adminProfessional.role !== "ADMIN") {
      throw new Error("Admin professional not found or not authorized");
    }

    if (name) adminProfessional.name = name;
    if (phone) adminProfessional.phone = phone;
    if (email) adminProfessional.email = email;
    if (password_hash)
      adminProfessional.password_hash = await hash(password_hash, 6);

    const updatedProfessional = await this.professionalRepository.update(
      adminProfessional
    );

    return {
      profissional: updatedProfessional,
    };
  }
}
