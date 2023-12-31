import { Prisma, Schedule } from "@prisma/client";

export interface ScheduleRepository {
  findById(id: string): Promise<Schedule | null>;
  create(data: Prisma.ScheduleCreateInput): Promise<Schedule>;
}
