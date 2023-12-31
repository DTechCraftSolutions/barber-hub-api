import { Prisma, AvailableTime } from "@prisma/client";

export interface AvailableTimeRepository {
  findById(id: string): Promise<AvailableTime | null>;
  create(data: Prisma.AvailableTimeCreateInput): Promise<AvailableTime>;
}
