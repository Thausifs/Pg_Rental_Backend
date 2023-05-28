-- AlterTable
ALTER TABLE "User" ADD COLUMN     "documentImageId" TEXT;

-- CreateTable
CREATE TABLE "DocumentImage" (
    "id" TEXT NOT NULL,
    "fieldname" TEXT,
    "originalname" TEXT,
    "encoding" TEXT,
    "mimetype" TEXT,
    "destination" TEXT,
    "filename" TEXT,
    "path" TEXT NOT NULL,
    "size" INTEGER,

    CONSTRAINT "DocumentImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_documentImageId_fkey" FOREIGN KEY ("documentImageId") REFERENCES "DocumentImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
