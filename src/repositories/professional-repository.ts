import { Prisma, Professional } from "@prisma/client";

export interface ProfessionalRepository {
  findById(id: string): Promise<Professional | null>;
  create(data: Prisma.ProfessionalCreateInput): Promise<Professional>;
  update(user: Professional): Promise<Professional>;
}
