/*
  Warnings:

  - A unique constraint covering the columns `[stadiumId,userId]` on the table `VisitedStadium` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VisitedStadium_stadiumId_userId_key" ON "VisitedStadium"("stadiumId", "userId");
