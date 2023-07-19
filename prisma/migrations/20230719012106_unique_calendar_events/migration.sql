/*
  Warnings:

  - A unique constraint covering the columns `[eventId,guestId,date]` on the table `Calendar` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hostId,title,duration]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Calendar_eventId_guestId_date_key" ON "Calendar"("eventId", "guestId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Event_hostId_title_duration_key" ON "Event"("hostId", "title", "duration");
