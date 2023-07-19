/*
  Warnings:

  - A unique constraint covering the columns `[timeslotId,guestId,date]` on the table `Calendar` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `timeSlotId` to the `Calendar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeslotId` to the `Calendar` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Calendar" DROP CONSTRAINT "Calendar_eventId_fkey";

-- DropIndex
DROP INDEX "Calendar_eventId_guestId_date_key";

-- AlterTable
ALTER TABLE "Calendar" ADD COLUMN     "timeSlotId" STRING NOT NULL;
ALTER TABLE "Calendar" ADD COLUMN     "timeslotId" STRING NOT NULL;
ALTER TABLE "Calendar" ALTER COLUMN "eventId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Calendar_timeslotId_guestId_date_key" ON "Calendar"("timeslotId", "guestId", "date");

-- AddForeignKey
ALTER TABLE "Calendar" ADD CONSTRAINT "Calendar_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calendar" ADD CONSTRAINT "Calendar_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
