/*
  Warnings:

  - Made the column `barberShopId` on table `professionals` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "professionals" DROP CONSTRAINT "professionals_barberShopId_fkey";

-- AlterTable
ALTER TABLE "professionals" ALTER COLUMN "barberShopId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "professionals" ADD CONSTRAINT "professionals_barberShopId_fkey" FOREIGN KEY ("barberShopId") REFERENCES "barber_shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
