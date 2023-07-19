/*
  Warnings:

  - You are about to drop the column `endDateTime` on the `TimeSlot` table. All the data in the column will be lost.
  - You are about to drop the column `startDateTime` on the `TimeSlot` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[eventId,startTime,endTime]` on the table `TimeSlot` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endTime` to the `TimeSlot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `TimeSlot` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "TimeSlot_eventId_startDateTime_endDateTime_key";

-- AlterTable
ALTER TABLE "TimeSlot" DROP COLUMN "endDateTime";
ALTER TABLE "TimeSlot" DROP COLUMN "startDateTime";
ALTER TABLE "TimeSlot" ADD COLUMN     "endTime" TIME NOT NULL;
ALTER TABLE "TimeSlot" ADD COLUMN     "startTime" TIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TimeSlot_eventId_startTime_endTime_key" ON "TimeSlot"("eventId", "startTime", "endTime");
