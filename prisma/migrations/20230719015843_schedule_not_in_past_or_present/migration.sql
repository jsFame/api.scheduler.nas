/*
  Warnings:

  - You are about to drop the column `timeslotId` on the `Calendar` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[timeSlotId,guestId,date]` on the table `Calendar` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Calendar_timeslotId_guestId_date_key";

-- AlterTable
ALTER TABLE "Calendar" DROP COLUMN "timeslotId";

-- CreateIndex
CREATE UNIQUE INDEX "Calendar_timeSlotId_guestId_date_key" ON "Calendar"("timeSlotId", "guestId", "date");
