/*
  Warnings:

  - You are about to drop the column `userId` on the `Affiliations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Affiliations" DROP CONSTRAINT "Affiliations_userId_fkey";

-- AlterTable
ALTER TABLE "Affiliations" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_AffiliationsToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AffiliationsToUser_AB_unique" ON "_AffiliationsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AffiliationsToUser_B_index" ON "_AffiliationsToUser"("B");

-- AddForeignKey
ALTER TABLE "_AffiliationsToUser" ADD CONSTRAINT "_AffiliationsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Affiliations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AffiliationsToUser" ADD CONSTRAINT "_AffiliationsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
