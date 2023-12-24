import { prisma } from "@/lib/prisma";
import { Prisma, BarberShop } from "@prisma/client";

import { BarberRepository } from "../barber-repository";

export class PrismaBarbersRepository implements BarberRepository {
  async update(data: BarberShop) {
    const { address, city, name, id, logo_url, plan } = data;

    const updatedUser = await prisma.barberShop.update({
      where: {
        id,
      },
      data: {
        address,
        city,
        name,
        logo_url,
        plan,
        updated_at: new Date(),
      },
    });

    return updatedUser;
  }

  async findById(id: string) {
    return prisma.barberShop.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: Prisma.BarberShopCreateInput) {
    return prisma.barberShop.create({
      data,
    });
  }
}
