import { prisma } from "@/lib/prisma";
import { Prisma, Service } from "@prisma/client";

import { ServiceRepository } from "../services-repository";

export class PrismaServicesRepository implements ServiceRepository {
  async update(data: Service) {
    const { barberShopId, id, name, price_cents } = data;

    const updatedUser = await prisma.service.update({
      where: {
        id,
      },
      data: {
        barberShopId,
        id,
        name,
        price_cents,
      },
    });

    return updatedUser;
  }

  async findById(id: string) {
    return prisma.service.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: Prisma.ServiceCreateInput) {
    return prisma.service.create({
      data,
    });
  }
}
