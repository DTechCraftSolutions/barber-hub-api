import { Prisma, Professional } from "@prisma/client";

export interface ProfessionalRepository {
  findByEmail(email: string): Promise<Professional | null>;
  findById(id: string): Promise<Professional | null>;
  create(data: Prisma.ProfessionalCreateInput): Promise<Professional>;
  update(user: Professional): Promise<Professional>;
  findAll(barberShopId: string): Promise<Professional[]>;
}
