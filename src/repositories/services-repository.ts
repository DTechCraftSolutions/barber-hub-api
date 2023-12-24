import { Prisma, Service } from "@prisma/client";

export interface ServiceRepository {
  findById(id: string): Promise<Service | null>;
  create(data: Prisma.ServiceCreateInput): Promise<Service>;
  update(user: Service): Promise<Service>;
}
