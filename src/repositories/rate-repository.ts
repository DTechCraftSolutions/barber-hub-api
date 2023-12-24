import { Prisma, Rate } from "@prisma/client";

export interface RateRepository {
  findById(id: string): Promise<Rate | null>;
  create(data: Prisma.RateCreateInput): Promise<Rate>;
  update(data: Rate): Promise<Rate>;
}
