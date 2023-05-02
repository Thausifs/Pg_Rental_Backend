/*
  Warnings:

  - Added the required column `ComplainCatagory` to the `Complain` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ComplainCatagory" AS ENUM ('ELECTRICAL', 'PLUMBING', 'SNITARY');

-- AlterTable
ALTER TABLE "Complain" ADD COLUMN     "ComplainCatagory" "ComplainCatagory" NOT NULL;
