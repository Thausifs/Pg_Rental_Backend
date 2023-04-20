/*
  Warnings:

  - The values [RESOVED] on the enum `ComplainState` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ComplainState_new" AS ENUM ('RESOLVED', 'CREATED');
ALTER TABLE "Complain" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "Complain" ALTER COLUMN "state" TYPE "ComplainState_new" USING ("state"::text::"ComplainState_new");
ALTER TYPE "ComplainState" RENAME TO "ComplainState_old";
ALTER TYPE "ComplainState_new" RENAME TO "ComplainState";
DROP TYPE "ComplainState_old";
ALTER TABLE "Complain" ALTER COLUMN "state" SET DEFAULT 'CREATED';
COMMIT;
