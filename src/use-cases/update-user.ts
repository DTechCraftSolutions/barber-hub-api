import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { hash } from "bcrypt";

interface UpdateUseCaseRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

interface UpdateUseCaseResponse {
  user: User;
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    name,
    email,
    password,
  }: UpdateUseCaseRequest): Promise<UpdateUseCaseResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password_hash = await hash(password, 6);

    const updatedUser = await this.usersRepository.update(user);

    return {
      user: updatedUser,
    };
  }
}
