/*
  Warnings:

  - A unique constraint covering the columns `[shipId]` on the table `HullCalculationResult` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "HullCalculationResult_shipId_key" ON "HullCalculationResult"("shipId");
