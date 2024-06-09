/*
  Warnings:

  - You are about to drop the column `images` on the `Works` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PersonalInfo" ADD COLUMN     "resume" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Works" DROP COLUMN "images";

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "isThumbnail" BOOLEAN NOT NULL DEFAULT false,
    "isImage" BOOLEAN NOT NULL DEFAULT true,
    "worksId" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Media_url_key" ON "Media"("url");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_worksId_fkey" FOREIGN KEY ("worksId") REFERENCES "Works"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
