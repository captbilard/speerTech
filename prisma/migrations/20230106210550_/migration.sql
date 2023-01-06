/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Tweet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tweet_id_userId_key" ON "Tweet"("id", "userId");
