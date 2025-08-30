-- CreateEnum
CREATE TYPE "LoadType" AS ENUM ('BENDING', 'SHEAR', 'AXIAL');

-- CreateEnum
CREATE TYPE "ShipTypeEnum" AS ENUM ('DRY_CARGO', 'TANKER', 'LNG_CARRIER', 'RO_RO', 'PASSENGER', 'ICEBREAKER', 'HEAVY_LIFT');

-- AlterTable
ALTER TABLE "Ship" ADD COLUMN     "material" TEXT;

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "shipId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "area" DOUBLE PRECISION,
    "momentInertia" DOUBLE PRECISION,
    "length" DOUBLE PRECISION,
    "beam" DOUBLE PRECISION,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Load" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "type" "LoadType" NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Load_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalculationResult" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "bendingStress" DOUBLE PRECISION,
    "shearStress" DOUBLE PRECISION,
    "axialStress" DOUBLE PRECISION,
    "deflection" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CalculationResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_shipId_fkey" FOREIGN KEY ("shipId") REFERENCES "Ship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalculationResult" ADD CONSTRAINT "CalculationResult_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
