/*
  Warnings:

  - A unique constraint covering the columns `[twitter]` on the table `Developer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `twitter` to the `Developer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Developer" DROP CONSTRAINT "Developer_personalInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Developer" DROP CONSTRAINT "Developer_worksId_fkey";

-- AlterTable
ALTER TABLE "Developer" ADD COLUMN     "twitter" TEXT NOT NULL,
ALTER COLUMN "worksId" DROP NOT NULL,
ALTER COLUMN "personalInfoId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Developer_twitter_key" ON "Developer"("twitter");

-- AddForeignKey
ALTER TABLE "Developer" ADD CONSTRAINT "Developer_worksId_fkey" FOREIGN KEY ("worksId") REFERENCES "Works"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Developer" ADD CONSTRAINT "Developer_personalInfoId_fkey" FOREIGN KEY ("personalInfoId") REFERENCES "PersonalInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
