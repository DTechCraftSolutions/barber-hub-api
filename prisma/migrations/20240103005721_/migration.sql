/*
  Warnings:

  - You are about to drop the column `end_time` on the `available_times` table. All the data in the column will be lost.
  - You are about to drop the column `initial_time` on the `available_times` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "available_times" DROP COLUMN "end_time",
DROP COLUMN "initial_time";
