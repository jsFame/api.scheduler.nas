/*
  Warnings:

  - You are about to alter the column `id` on the `users` table. The data in that column will be cast from `Int` to `Int`. This cast may fail. Please make sure the data in the column can be cast.

*/
-- CreateTable
CREATE TABLE "Event" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING,
    "hostId" INT4 NOT NULL,
    "duration" INT4 NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeSlot" (
    "id" STRING NOT NULL,
    "eventId" STRING NOT NULL,
    "startDateTime" TIME NOT NULL,
    "endDateTime" TIME NOT NULL,
    "available" BOOL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimeSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calendar" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "eventId" STRING NOT NULL,
    "guestId" INT4 NOT NULL,
    "date" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Calendar_pkey" PRIMARY KEY ("id")
);

-- RedefineTables
CREATE TABLE "_prisma_new_users" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "email" STRING NOT NULL,
    "hash" STRING NOT NULL,
    "firstName" STRING,
    "lastName" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
DROP INDEX "users_email_key";
INSERT INTO "_prisma_new_users" ("createdAt","email","firstName","hash","id","lastName","updatedAt") SELECT "createdAt","email","firstName","hash","id","lastName","updatedAt" FROM "users";
DROP TABLE "users" CASCADE;
ALTER TABLE "_prisma_new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TimeSlot_eventId_startDateTime_endDateTime_key" ON "TimeSlot"("eventId", "startDateTime", "endDateTime");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSlot" ADD CONSTRAINT "TimeSlot_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calendar" ADD CONSTRAINT "Calendar_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calendar" ADD CONSTRAINT "Calendar_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
