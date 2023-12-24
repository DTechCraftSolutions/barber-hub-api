import { Prisma, Rate } from "@prisma/client";

export interface RateRepository {
  create(data: Prisma.RateCreateInput): Promise<Rate>;
}
