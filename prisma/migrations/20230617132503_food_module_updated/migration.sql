/*
  Warnings:

  - You are about to drop the column `menuid` on the `Foodmenu` table. All the data in the column will be lost.
  - You are about to drop the column `residentid` on the `Foodmenu` table. All the data in the column will be lost.
  - Added the required column `cityid` to the `Foodmenu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foodmenuid` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Foodmenu" DROP CONSTRAINT "Foodmenu_menuid_fkey";

-- DropForeignKey
ALTER TABLE "Foodmenu" DROP CONSTRAINT "Foodmenu_residentid_fkey";

-- AlterTable
ALTER TABLE "Foodmenu" DROP COLUMN "menuid",
DROP COLUMN "residentid",
ADD COLUMN     "cityid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "foodmenuid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Foodmenu" ADD CONSTRAINT "Foodmenu_cityid_fkey" FOREIGN KEY ("cityid") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_foodmenuid_fkey" FOREIGN KEY ("foodmenuid") REFERENCES "Foodmenu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
