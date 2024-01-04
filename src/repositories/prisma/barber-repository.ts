import { prisma } from "@/lib/prisma";
import { Prisma, BarberShop, $Enums } from "@prisma/client";

import { BarberRepository } from "../barber-repository";

export class PrismaBarbersRepository implements BarberRepository {
  async fetchByCityAndName(city: string, name: string) {
    return prisma.barberShop.findMany({
      where: {
        name: {
          contains: name,
        },
        city: {
          contains: city,
        },
      },
    });
  }
  async fetchAll() {
    return prisma.barberShop.findMany();
  }
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
