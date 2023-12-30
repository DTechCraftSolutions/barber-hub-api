import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { hash } from "bcrypt";

interface UpdateUseCaseRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  phone?: string | null;
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
    phone,
  }: UpdateUseCaseRequest): Promise<UpdateUseCaseResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password_hash = await hash(password, 6);
    if (phone) user.phone = phone;

    const updatedUser = await this.usersRepository.update(user);

    return {
      user: updatedUser,
    };
  }
}
