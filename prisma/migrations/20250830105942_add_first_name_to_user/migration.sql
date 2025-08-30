-- CreateTable
CREATE TABLE "Ship" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "shipTypeId" INTEGER NOT NULL,

    CONSTRAINT "Ship_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ship" ADD CONSTRAINT "Ship_shipTypeId_fkey" FOREIGN KEY ("shipTypeId") REFERENCES "ShipType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ship" ADD CONSTRAINT "Ship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
