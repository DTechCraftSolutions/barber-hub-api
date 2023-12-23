import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { compare } from "bcrypt";

interface AuthenticateUserUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseUserCaseResponse {
  user: {
    id: User["id"];
    name: User["name"];
    email: User["email"];
  };
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUseUserCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new Error("Invalid credentials");
    }

    return { user };
  }
}
