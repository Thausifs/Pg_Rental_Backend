/*
  Warnings:

  - Added the required column `updatedAt` to the `AdvanceBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Complain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `RentPaymentSubcriptin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Schedule_Visit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdvanceBooking" ADD COLUMN     "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(3) NOT NULL;

-- AlterTable
ALTER TABLE "Complain" ADD COLUMN     "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(3) NOT NULL;

-- AlterTable
ALTER TABLE "RentPaymentSubcriptin" ADD COLUMN     "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(3) NOT NULL;

-- AlterTable
ALTER TABLE "Schedule_Visit" ADD COLUMN     "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(3) NOT NULL;
