import { Prisma, BarberShop } from "@prisma/client";

export interface BarberRepository {
  findById(id: string): Promise<BarberShop | null>;
  create(data: Prisma.BarberShopCreateInput): Promise<BarberShop>;
  update(user: BarberShop): Promise<BarberShop>;
  fetchAll(): Promise<BarberShop[]>;
  fetchByCityAndName(city: string, name: string): Promise<BarberShop[]>;
}
