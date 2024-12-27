-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "energy" INTEGER NOT NULL,
    "level_of_dependence" TEXT NOT NULL,
    "enviroment" TEXT NOT NULL,
    "photos" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "city_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "whatsappNumber" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "citys" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "state_id" TEXT NOT NULL,

    CONSTRAINT "citys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "states" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdoptionRequirements" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "AdoptionRequirements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "states_name_key" ON "states"("name");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "citys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "citys" ADD CONSTRAINT "citys_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionRequirements" ADD CONSTRAINT "AdoptionRequirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
