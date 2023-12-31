import { ProfessionalRepository } from "@/repositories/professional-repository";
import { Professional, Role } from "@prisma/client";
import { RegisterBarberUseCase } from "./register-barber";
import { hash } from "bcrypt";

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
  available_times: string[];
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
        available_times: [],
      });

      barberShopId = barber.id;
    }

    // Cria um profissional com os dados fornecidos e associa à nova barbearia (se existir)

    const password_hashed = await hash(password_hash, 6);

    const professional = await this.professionalRepository.create({
      name,
      phone,
      email,
      password_hash: password_hashed,
      role,
      BarberShop: barberShopId ? { connect: { id: barberShopId } } : undefined,
    });

    return { professional };
  }
}
