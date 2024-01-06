/*
  Warnings:

  - A unique constraint covering the columns `[barberShopId]` on the table `professionals` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "professionals_barberShopId_key" ON "professionals"("barberShopId");
