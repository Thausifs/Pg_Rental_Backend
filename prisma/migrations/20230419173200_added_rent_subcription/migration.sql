/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `AvailAbility` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "RentPaymentStatus" AS ENUM ('CREATED', 'ACTIVE', 'CANCEL');

-- CreateTable
CREATE TABLE "RentPaymentSubcriptin" (
    "uid" TEXT NOT NULL,
    "status" "RentPaymentStatus" NOT NULL DEFAULT 'CREATED',
    "userId" TEXT NOT NULL,
    "availabilityId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "subcriptionId" TEXT NOT NULL,
    "razorpayPaymentId" TEXT NOT NULL,

    CONSTRAINT "RentPaymentSubcriptin_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "AvailAbility_uid_key" ON "AvailAbility"("uid");

-- AddForeignKey
ALTER TABLE "RentPaymentSubcriptin" ADD CONSTRAINT "RentPaymentSubcriptin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentPaymentSubcriptin" ADD CONSTRAINT "RentPaymentSubcriptin_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "AvailAbility"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
