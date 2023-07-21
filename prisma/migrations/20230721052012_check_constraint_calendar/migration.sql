/*
  Warnings:

  - Changed the type of `startTime` on the `timeslots` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endTime` on the `timeslots` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "timeslots" DROP COLUMN "startTime";
ALTER TABLE "timeslots" ADD COLUMN     "startTime" TIMETZ NOT NULL;
ALTER TABLE "timeslots" DROP COLUMN "endTime";
ALTER TABLE "timeslots" ADD COLUMN     "endTime" TIMETZ NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "timeslots_eventId_startTime_endTime_key" ON "timeslots"("eventId", "startTime", "endTime");
