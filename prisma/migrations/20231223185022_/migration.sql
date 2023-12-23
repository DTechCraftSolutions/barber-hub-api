/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `barber_shops` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `barber_shops` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `barber_shops` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `barber_shops` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo_url` to the `barber_shops` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `barber_shops` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan` to the `barber_shops` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barberShopId` to the `professionals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `professionals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `professionals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `rates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barberShopId` to the `rates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `rates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barberShopId` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "barber_shops" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "logo_url" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "plan" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "professionals" ADD COLUMN     "barberShopId" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "rates" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "barberShopId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "schedules" ADD COLUMN     "barberShopId" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "serviceId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price_cents" INTEGER NOT NULL,
    "needed_time_minutes" INTEGER NOT NULL,
    "barberShopId" TEXT NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "barber_shops_cpf_key" ON "barber_shops"("cpf");

-- AddForeignKey
ALTER TABLE "professionals" ADD CONSTRAINT "professionals_barberShopId_fkey" FOREIGN KEY ("barberShopId") REFERENCES "barber_shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_barberShopId_fkey" FOREIGN KEY ("barberShopId") REFERENCES "barber_shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rates" ADD CONSTRAINT "rates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rates" ADD CONSTRAINT "rates_barberShopId_fkey" FOREIGN KEY ("barberShopId") REFERENCES "barber_shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_barberShopId_fkey" FOREIGN KEY ("barberShopId") REFERENCES "barber_shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
