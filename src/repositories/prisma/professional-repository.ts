import { prisma } from "@/lib/prisma";
import { Prisma, Professional } from "@prisma/client";

import { ProfessionalRepository } from "../professional-repository";

export class PrismaProfessionalRepository implements ProfessionalRepository {
  async findAll(barberShopId: string) {
    const professionals = prisma.professional.findMany({
      where: {
        barberShopId,
      },
      include: {
        BarberShop: true,
      },
    });
    return professionals;
  }
  async findByEmail(email: string) {
    return prisma.professional.findUnique({
      where: {
        email,
      },
    });
  }
  async update(data: Professional) {
    const { id, email, name, password_hash, phone } = data;

    const updatedProfessional = await prisma.professional.update({
      where: {
        id,
      },
      data: {
        email,
        name,
        password_hash,
        phone,
      },
    });

    return updatedProfessional;
  }

  async findById(id: string) {
    return prisma.professional.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: Prisma.ProfessionalCreateInput) {
    return prisma.professional.create({
      data,
    });
  }
}
