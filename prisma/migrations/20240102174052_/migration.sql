/*
  Warnings:

  - Added the required column `end_time` to the `available_times` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initial_time` to the `available_times` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "available_times" ADD COLUMN     "end_time" TEXT NOT NULL,
ADD COLUMN     "initial_time" TEXT NOT NULL;
