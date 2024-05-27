/*
  Warnings:

  - Added the required column `category` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('ALUMNI', 'CURRENTLY_STUDYING');

-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "category" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "enrollmentStatus" "EnrollmentStatus" NOT NULL DEFAULT 'CURRENTLY_STUDYING';

-- CreateTable
CREATE TABLE "Affiliations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Affiliations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Affiliations" ADD CONSTRAINT "Affiliations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
