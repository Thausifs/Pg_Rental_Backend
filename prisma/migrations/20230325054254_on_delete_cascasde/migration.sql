-- DropForeignKey
ALTER TABLE "AvailAbility" DROP CONSTRAINT "AvailAbility_residentId_fkey";

-- DropForeignKey
ALTER TABLE "AvailAbility" DROP CONSTRAINT "AvailAbility_roomTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_feature_image_id_fkey";

-- DropForeignKey
ALTER TABLE "FeatureResident" DROP CONSTRAINT "FeatureResident_featureId_fkey";

-- DropForeignKey
ALTER TABLE "FeatureResident" DROP CONSTRAINT "FeatureResident_residentId_fkey";

-- DropForeignKey
ALTER TABLE "ResidentCommonAreaImage" DROP CONSTRAINT "ResidentCommonAreaImage_residentId_fkey";

-- DropForeignKey
ALTER TABLE "ResidentCoverImage" DROP CONSTRAINT "ResidentCoverImage_residentId_fkey";

-- DropForeignKey
ALTER TABLE "ResidentDinningImage" DROP CONSTRAINT "ResidentDinningImage_residentId_fkey";

-- DropForeignKey
ALTER TABLE "ResidentRoomImage" DROP CONSTRAINT "ResidentRoomImage_residentId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_profile_pic_id_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profile_pic_id_fkey" FOREIGN KEY ("profile_pic_id") REFERENCES "ProfileImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "AvailAbility" ADD CONSTRAINT "AvailAbility_roomTypeId_fkey" FOREIGN KEY ("roomTypeId") REFERENCES "RoomType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailAbility" ADD CONSTRAINT "AvailAbility_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE CASCADE ON UPDATE CASCADE;
