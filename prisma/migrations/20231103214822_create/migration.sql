/*
  Warnings:

  - You are about to drop the column `photos` on the `pets` table. All the data in the column will be lost.
  - Added the required column `photo` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "photos",
ADD COLUMN     "photo" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "pet_galery" (
    "id" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "pet_galery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pet_galery" ADD CONSTRAINT "pet_galery_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
