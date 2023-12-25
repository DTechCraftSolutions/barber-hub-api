import { prisma } from "@/lib/prisma";
import { Prisma, Professional } from "@prisma/client";

import { ProfessionalRepository } from "../professional-repository";

export class PrismaProfessionalRepository implements ProfessionalRepository {
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
