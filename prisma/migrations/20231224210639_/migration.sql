-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'WORKER');

-- DropForeignKey
ALTER TABLE "professionals" DROP CONSTRAINT "professionals_barberShopId_fkey";

-- AlterTable
ALTER TABLE "professionals" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ADMIN',
ALTER COLUMN "barberShopId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "professionals" ADD CONSTRAINT "professionals_barberShopId_fkey" FOREIGN KEY ("barberShopId") REFERENCES "barber_shops"("id") ON DELETE SET NULL ON UPDATE CASCADE;
