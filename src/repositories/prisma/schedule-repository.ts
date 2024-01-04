import { prisma } from "@/lib/prisma";
import { Prisma, Schedule } from "@prisma/client";

import { ScheduleRepository } from "../schedule-repository";
export class PrismaScheduleRepository implements ScheduleRepository {
  async findById(id: string): Promise<Schedule | null> {
    const schedule = await prisma.schedule.findUnique({
      where: {
        id,
      },
    });

    return schedule;
  }

  async create(data: Prisma.ScheduleCreateInput): Promise<Schedule> {
    const schedule = await prisma.schedule.create({
      data,
    });

    return schedule;
  }
}
