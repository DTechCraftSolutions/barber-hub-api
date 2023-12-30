import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { hash } from "bcrypt";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    phone,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new Error("User already exists");
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      phone,
    });

    return {
      user,
    };
  }
}
