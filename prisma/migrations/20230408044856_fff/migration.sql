-- CreateEnum
CREATE TYPE "ScheduleVisitState" AS ENUM ('scheduled', 'completed', 'failed');

-- CreateTable
CREATE TABLE "ProfileImage" (
    "id" TEXT NOT NULL,
    "fieldname" TEXT NOT NULL,
    "originalname" TEXT NOT NULL,
    "encoding" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "ProfileImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "phoneNo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profile_pic_id" TEXT,
    "address" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "document_type" TEXT NOT NULL,
    "document_detail" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Otp" (
    "id" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureImage" (
    "id" TEXT NOT NULL,
    "fieldname" TEXT,
    "originalname" TEXT,
    "encoding" TEXT,
    "mimetype" TEXT,
    "destination" TEXT,
    "filename" TEXT,
    "path" TEXT NOT NULL,
    "size" INTEGER,

    CONSTRAINT "FeatureImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" TEXT NOT NULL,
    "feature_name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "feature_image_id" TEXT NOT NULL,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomType" (
    "id" TEXT NOT NULL,
    "typeOfRoom" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "RoomType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResidentRoomImage" (
    "id" TEXT NOT NULL,
    "fieldname" TEXT,
    "originalname" TEXT,
    "encoding" TEXT,
    "mimetype" TEXT,
    "destination" TEXT,
    "filename" TEXT,
    "path" TEXT NOT NULL,
    "size" INTEGER,
    "residentId" TEXT,

    CONSTRAINT "ResidentRoomImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResidentCoverImage" (
    "id" TEXT NOT NULL,
    "fieldname" TEXT,
    "originalname" TEXT,
    "encoding" TEXT,
    "mimetype" TEXT,
    "destination" TEXT,
    "filename" TEXT,
    "path" TEXT NOT NULL,
    "size" INTEGER,
    "residentId" TEXT,

    CONSTRAINT "ResidentCoverImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResidentDinningImage" (
    "id" TEXT NOT NULL,
    "fieldname" TEXT,
    "originalname" TEXT,
    "encoding" TEXT,
    "mimetype" TEXT,
    "destination" TEXT,
    "filename" TEXT,
    "path" TEXT NOT NULL,
    "size" INTEGER,
    "residentId" TEXT,

    CONSTRAINT "ResidentDinningImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResidentCommonAreaImage" (
    "id" TEXT NOT NULL,
    "fieldname" TEXT,
    "originalname" TEXT,
    "encoding" TEXT,
    "mimetype" TEXT,
    "destination" TEXT,
    "filename" TEXT,
    "path" TEXT NOT NULL,
    "size" INTEGER,
    "residentId" TEXT,

    CONSTRAINT "ResidentCommonAreaImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureResident" (
    "fovarateFeature" BOOLEAN NOT NULL DEFAULT false,
    "residentId" TEXT NOT NULL,
    "featureId" TEXT NOT NULL,

    CONSTRAINT "FeatureResident_pkey" PRIMARY KEY ("residentId","featureId")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resident" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "seoTitle" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "hotelSupportNumber" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "googleMapUrl" TEXT NOT NULL,

    CONSTRAINT "Resident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule_Visit" (
    "uid" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "residentId" TEXT NOT NULL,
    "completionState" "ScheduleVisitState" NOT NULL DEFAULT 'scheduled',

    CONSTRAINT "Schedule_Visit_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "AvailAbility" (
    "uid" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "numberOfOccupancies" INTEGER NOT NULL,
    "roomTypeId" TEXT NOT NULL,
    "residentId" TEXT NOT NULL,

    CONSTRAINT "AvailAbility_pkey" PRIMARY KEY ("residentId","roomTypeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_profile_pic_id_key" ON "User"("profile_pic_id");

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");

-- CreateIndex
CREATE UNIQUE INDEX "City_slug_key" ON "City"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_feature_name_key" ON "Feature"("feature_name");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_slug_key" ON "Feature"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_feature_image_id_key" ON "Feature"("feature_image_id");

-- CreateIndex
CREATE UNIQUE INDEX "RoomType_typeOfRoom_key" ON "RoomType"("typeOfRoom");

-- CreateIndex
CREATE UNIQUE INDEX "RoomType_slug_key" ON "RoomType"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Resident_locationId_key" ON "Resident"("locationId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profile_pic_id_fkey" FOREIGN KEY ("profile_pic_id") REFERENCES "ProfileImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_feature_image_id_fkey" FOREIGN KEY ("feature_image_id") REFERENCES "FeatureImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResidentRoomImage" ADD CONSTRAINT "ResidentRoomImage_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResidentCoverImage" ADD CONSTRAINT "ResidentCoverImage_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResidentDinningImage" ADD CONSTRAINT "ResidentDinningImage_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResidentCommonAreaImage" ADD CONSTRAINT "ResidentCommonAreaImage_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureResident" ADD CONSTRAINT "FeatureResident_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureResident" ADD CONSTRAINT "FeatureResident_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resident" ADD CONSTRAINT "Resident_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resident" ADD CONSTRAINT "Resident_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule_Visit" ADD CONSTRAINT "Schedule_Visit_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailAbility" ADD CONSTRAINT "AvailAbility_roomTypeId_fkey" FOREIGN KEY ("roomTypeId") REFERENCES "RoomType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailAbility" ADD CONSTRAINT "AvailAbility_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE CASCADE ON UPDATE CASCADE;
