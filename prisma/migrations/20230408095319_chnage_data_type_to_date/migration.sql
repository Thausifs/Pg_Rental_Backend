/*
  Warnings:

  - The values [failed] on the enum `ScheduleVisitState` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `date` on the `Schedule_Visit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ScheduleVisitState_new" AS ENUM ('scheduled', 'completed', 'canceled');
ALTER TABLE "Schedule_Visit" ALTER COLUMN "completionState" DROP DEFAULT;
ALTER TABLE "Schedule_Visit" ALTER COLUMN "completionState" TYPE "ScheduleVisitState_new" USING ("completionState"::text::"ScheduleVisitState_new");
ALTER TYPE "ScheduleVisitState" RENAME TO "ScheduleVisitState_old";
ALTER TYPE "ScheduleVisitState_new" RENAME TO "ScheduleVisitState";
DROP TYPE "ScheduleVisitState_old";
ALTER TABLE "Schedule_Visit" ALTER COLUMN "completionState" SET DEFAULT 'scheduled';
COMMIT;

-- AlterTable
ALTER TABLE "Schedule_Visit" ADD COLUMN     "roomType" TEXT NOT NULL DEFAULT 'Single Bed room',
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
