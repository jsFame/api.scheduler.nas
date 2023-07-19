/*
  Warnings:

  - You are about to drop the column `eventId` on the `Calendar` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Calendar" DROP CONSTRAINT "Calendar_eventId_fkey";

-- AlterTable
ALTER TABLE "Calendar" DROP COLUMN "eventId";
