/*
  Warnings:

  - You are about to drop the column `visitedStadiumId` on the `Review` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_visitedStadiumId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "visitedStadiumId";
