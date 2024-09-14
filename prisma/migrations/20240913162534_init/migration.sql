/*
  Warnings:

  - Added the required column `address` to the `Stadium` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Stadium` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stadium" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL;
