-- CreateTable
CREATE TABLE "HullCalculationResult" (
    "id" SERIAL NOT NULL,
    "shipId" INTEGER NOT NULL,
    "iceClass" "IceClass" NOT NULL,
    "iceForce" DOUBLE PRECISION NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HullCalculationResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HullProfilePoint" (
    "id" SERIAL NOT NULL,
    "hullCalculationResultId" INTEGER NOT NULL,
    "position" DOUBLE PRECISION NOT NULL,
    "thickness" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "HullProfilePoint_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HullCalculationResult" ADD CONSTRAINT "HullCalculationResult_shipId_fkey" FOREIGN KEY ("shipId") REFERENCES "Ship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HullProfilePoint" ADD CONSTRAINT "HullProfilePoint_hullCalculationResultId_fkey" FOREIGN KEY ("hullCalculationResultId") REFERENCES "HullCalculationResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
