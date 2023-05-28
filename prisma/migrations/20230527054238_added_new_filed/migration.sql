/*
  Warnings:

  - Added the required column `roomNo` to the `RentPaymentSubcriptin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RentPaymentSubcriptin" ADD COLUMN     "roomNo" TEXT NOT NULL;
