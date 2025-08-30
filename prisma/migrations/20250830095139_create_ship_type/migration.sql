-- CreateTable
CREATE TABLE "ShipType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "ShipType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShipType_name_key" ON "ShipType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ShipType_code_key" ON "ShipType"("code");
