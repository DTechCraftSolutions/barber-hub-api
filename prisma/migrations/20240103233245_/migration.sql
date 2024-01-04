/*
  Warnings:

  - Added the required column `availableTimeId` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schedules" ADD COLUMN     "availableTimeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_availableTimeId_fkey" FOREIGN KEY ("availableTimeId") REFERENCES "available_times"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
