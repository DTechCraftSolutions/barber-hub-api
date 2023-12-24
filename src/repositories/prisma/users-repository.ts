import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";

import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async update(data: User) {
    const { name, id, email, password_hash } = data;

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password_hash,
        updated_at: new Date(),
      },
    });

    return updatedUser;
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
    });
  }
}
