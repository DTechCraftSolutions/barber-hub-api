/*
  Warnings:

  - Added the required column `email` to the `professionals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `professionals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professionalId` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "professionals" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password_hash" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "schedules" ADD COLUMN     "professionalId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
