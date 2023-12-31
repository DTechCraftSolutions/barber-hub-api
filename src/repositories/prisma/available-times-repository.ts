import { prisma } from "@/lib/prisma";
import { Prisma, AvailableTime } from "@prisma/client";

import { AvailableTimeRepository } from "../available-times-repository";

export class PrismaUsersRepository implements AvailableTimeRepository {
  async findById(id: string) {
    const availableTimes = await prisma.availableTime.findUnique({
      where: {
        id,
      },
    });

    return availableTimes;
  }

  async create(data: Prisma.AvailableTimeCreateInput) {
    const availableTimes = await prisma.availableTime.create({
      data,
    });

    return availableTimes;
  }
}
