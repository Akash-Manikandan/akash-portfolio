/*
  Warnings:

  - You are about to drop the column `worksId` on the `Developer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Developer" DROP CONSTRAINT "Developer_worksId_fkey";

-- AlterTable
ALTER TABLE "Developer" DROP COLUMN "worksId";

-- CreateTable
CREATE TABLE "_DeveloperToWorks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DeveloperToWorks_AB_unique" ON "_DeveloperToWorks"("A", "B");

-- CreateIndex
CREATE INDEX "_DeveloperToWorks_B_index" ON "_DeveloperToWorks"("B");

-- AddForeignKey
ALTER TABLE "_DeveloperToWorks" ADD CONSTRAINT "_DeveloperToWorks_A_fkey" FOREIGN KEY ("A") REFERENCES "Developer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeveloperToWorks" ADD CONSTRAINT "_DeveloperToWorks_B_fkey" FOREIGN KEY ("B") REFERENCES "Works"("id") ON DELETE CASCADE ON UPDATE CASCADE;
