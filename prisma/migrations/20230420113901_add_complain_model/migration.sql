-- CreateEnum
CREATE TYPE "ComplainState" AS ENUM ('RESOVED', 'CREATED');

-- CreateTable
CREATE TABLE "Complain" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "state" "ComplainState" NOT NULL DEFAULT 'CREATED',

    CONSTRAINT "Complain_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Complain" ADD CONSTRAINT "Complain_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
