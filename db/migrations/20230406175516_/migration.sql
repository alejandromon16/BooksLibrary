-- CreateTable
CREATE TABLE "FavoriteBook" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,
    "bookID" TEXT NOT NULL,

    CONSTRAINT "FavoriteBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FavoriteBookToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteBookToUser_AB_unique" ON "_FavoriteBookToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteBookToUser_B_index" ON "_FavoriteBookToUser"("B");

-- AddForeignKey
ALTER TABLE "_FavoriteBookToUser" ADD CONSTRAINT "_FavoriteBookToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "FavoriteBook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteBookToUser" ADD CONSTRAINT "_FavoriteBookToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
