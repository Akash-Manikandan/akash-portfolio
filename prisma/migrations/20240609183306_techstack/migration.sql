-- CreateTable
CREATE TABLE "TechStack" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "TechStack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TechStackToWorks" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TechStackToWorks_AB_unique" ON "_TechStackToWorks"("A", "B");

-- CreateIndex
CREATE INDEX "_TechStackToWorks_B_index" ON "_TechStackToWorks"("B");

-- AddForeignKey
ALTER TABLE "_TechStackToWorks" ADD CONSTRAINT "_TechStackToWorks_A_fkey" FOREIGN KEY ("A") REFERENCES "TechStack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TechStackToWorks" ADD CONSTRAINT "_TechStackToWorks_B_fkey" FOREIGN KEY ("B") REFERENCES "Works"("id") ON DELETE CASCADE ON UPDATE CASCADE;
