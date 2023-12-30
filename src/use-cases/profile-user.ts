import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";

interface ProfileUserUseCaseRequest {
  id: string;
}

interface ProfileUserUseCaseResponse {
  user: {
    id: User["id"];
    name: User["name"];
    email: User["email"];
    phone?: User["phone"];
  };
}

export class ProfileUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    id,
  }: ProfileUserUseCaseRequest): Promise<ProfileUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return {
      user,
    };
  }
}
