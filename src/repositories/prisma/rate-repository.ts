import { Prisma, Rate } from "@prisma/client";
import { RateRepository } from "@/repositories/rate-repository";
import { prisma } from "@/lib/prisma";

export class PrismaRateRepository implements RateRepository {
  async create(data: Prisma.RateCreateInput): Promise<Rate> {
    return await prisma.rate.create({
      data,
    });
  }
}
