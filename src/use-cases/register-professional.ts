import { ProfessionalRepository } from "@/repositories/professional-repository";
import { Professional, Role } from "@prisma/client";
import { RegisterBarberUseCase } from "./register-barber";

interface RegisterProfessionalUseCaseRequest {
  nameBarber: string;
  name: string;
  phone: string;
  email: string;
  password_hash: string;
  role: Role;
  address: string;
  city: string;
  cpf: string;
  logo_url: string;
  plan: string;
}

interface RegisterProfessionalUseCaseResponse {
  professional: Professional;
}

export class RegisterProfessionalUseCase {
  constructor(
    private professionalRepository: ProfessionalRepository,
    private barberUseCase: RegisterBarberUseCase
  ) {}

  async execute({
    nameBarber,
    name,
    phone,
    email,
    password_hash,
    role,
    address,
    city,
    cpf,
    logo_url,
    plan,
  }: RegisterProfessionalUseCaseRequest): Promise<RegisterProfessionalUseCaseResponse> {
    let barberShopId: string | undefined;

    // Se o papel do profissional for ADMIN, crie uma nova barbearia
    if (role === Role.ADMIN) {
      const { barber } = await this.barberUseCase.execute({
        address,
        city,
        name: nameBarber,
        logo_url,
        plan,
        cpf,
      });

      barberShopId = barber.id;
    }

    // Cria um profissional com os dados fornecidos e associa à nova barbearia (se existir)
    const professional = await this.professionalRepository.create({
      name,
      phone,
      email,
      password_hash,
      role,
      BarberShop: barberShopId ? { connect: { id: barberShopId } } : undefined,
    });

    return { professional };
  }
}
