/*
  Warnings:

  - You are about to drop the `_ServerToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ownerId` to the `Server` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ServerToUser" DROP CONSTRAINT "_ServerToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ServerToUser" DROP CONSTRAINT "_ServerToUser_B_fkey";

-- AlterTable
ALTER TABLE "Server" ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ServerToUser";

-- CreateTable
CREATE TABLE "_ServerUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ServerUsers_AB_unique" ON "_ServerUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_ServerUsers_B_index" ON "_ServerUsers"("B");

-- AddForeignKey
ALTER TABLE "Server" ADD CONSTRAINT "Server_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServerUsers" ADD CONSTRAINT "_ServerUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServerUsers" ADD CONSTRAINT "_ServerUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
