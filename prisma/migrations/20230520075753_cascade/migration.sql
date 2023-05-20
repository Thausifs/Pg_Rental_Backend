-- DropForeignKey
ALTER TABLE "AdvanceBooking" DROP CONSTRAINT "AdvanceBooking_residentId_fkey";

-- DropForeignKey
ALTER TABLE "Complain" DROP CONSTRAINT "Complain_userId_fkey";

-- DropForeignKey
ALTER TABLE "Otp" DROP CONSTRAINT "Otp_userId_fkey";

-- DropForeignKey
ALTER TABLE "RentPaymentSubcriptin" DROP CONSTRAINT "RentPaymentSubcriptin_availabilityId_fkey";

-- DropForeignKey
ALTER TABLE "RentPaymentSubcriptin" DROP CONSTRAINT "RentPaymentSubcriptin_userId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule_Visit" DROP CONSTRAINT "Schedule_Visit_residentId_fkey";

-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_teamMemberImageId_fkey";

-- AddForeignKey
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule_Visit" ADD CONSTRAINT "Schedule_Visit_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvanceBooking" ADD CONSTRAINT "AdvanceBooking_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentPaymentSubcriptin" ADD CONSTRAINT "RentPaymentSubcriptin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentPaymentSubcriptin" ADD CONSTRAINT "RentPaymentSubcriptin_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "AvailAbility"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complain" ADD CONSTRAINT "Complain_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_teamMemberImageId_fkey" FOREIGN KEY ("teamMemberImageId") REFERENCES "TeamMemberImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
