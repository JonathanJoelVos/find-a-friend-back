-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_city_id_fkey";

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "cityId" TEXT;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "citys"("id") ON DELETE SET NULL ON UPDATE CASCADE;
