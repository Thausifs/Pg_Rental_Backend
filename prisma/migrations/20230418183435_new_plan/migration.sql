/*
  Warnings:

  - You are about to drop the column `razorpayPlanId` on the `AvailAbility` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AvailAbility" DROP COLUMN "razorpayPlanId",
ADD COLUMN     "planIdRazorpay" TEXT;
