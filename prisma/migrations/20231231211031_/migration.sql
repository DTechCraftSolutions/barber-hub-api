/*
  Warnings:

  - You are about to drop the column `available_times` on the `barber_shops` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "barber_shops" DROP COLUMN "available_times";

-- CreateTable
CREATE TABLE "available_times" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "barberShopId" TEXT NOT NULL,

    CONSTRAINT "available_times_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "available_times" ADD CONSTRAINT "available_times_barberShopId_fkey" FOREIGN KEY ("barberShopId") REFERENCES "barber_shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
