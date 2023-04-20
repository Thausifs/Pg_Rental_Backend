/*
  Warnings:

  - A unique constraint covering the columns `[subcriptionId]` on the table `RentPaymentSubcriptin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RentPaymentSubcriptin_subcriptionId_key" ON "RentPaymentSubcriptin"("subcriptionId");
