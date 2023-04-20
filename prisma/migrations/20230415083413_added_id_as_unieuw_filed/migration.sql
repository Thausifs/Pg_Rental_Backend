/*
  Warnings:

  - The primary key for the `Comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[residentId,userId]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_pkey",
ADD CONSTRAINT "Comment_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_residentId_userId_key" ON "Comment"("residentId", "userId");
