-- CreateTable
CREATE TABLE "TeamMemberImage" (
    "id" TEXT NOT NULL,
    "fieldname" TEXT NOT NULL,
    "originalname" TEXT NOT NULL,
    "encoding" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "TeamMemberImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "titile" TEXT NOT NULL,
    "facebookUrl" TEXT,
    "linkedinUrl" TEXT,
    "twitterUrl" TEXT,
    "teamMemberImageId" TEXT NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_teamMemberImageId_fkey" FOREIGN KEY ("teamMemberImageId") REFERENCES "TeamMemberImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
