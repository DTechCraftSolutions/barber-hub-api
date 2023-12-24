import { Prisma, Rate } from "@prisma/client";
import { RateRepository } from "@/repositories/rate-repository";
import { prisma } from "@/lib/prisma";

export class PrismaRateRepository implements RateRepository {
  async update(data: Rate): Promise<Rate> {
    return await prisma.rate.update({
      where: {
        id: data.id,
      },
      data,
    });
  }
  async create(data: Prisma.RateCreateInput): Promise<Rate> {
    return await prisma.rate.create({
      data,
    });
  }

  async findById(id: string): Promise<Rate | null> {
    return await prisma.rate.findUnique({
      where: {
        id,
      },
    });
  }
}
