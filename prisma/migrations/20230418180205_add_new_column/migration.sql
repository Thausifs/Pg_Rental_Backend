/*
  Warnings:

  - Added the required column `razorpayPlanId` to the `AvailAbility` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AvailAbility" ADD COLUMN     "razorpayPlanId" TEXT NOT NULL;
