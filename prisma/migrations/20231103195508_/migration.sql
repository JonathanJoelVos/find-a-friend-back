/*
  Warnings:

  - You are about to drop the column `cityId` on the `pets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_cityId_fkey";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "cityId";

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "citys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
