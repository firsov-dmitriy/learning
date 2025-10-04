/*
  Warnings:

  - The `iceClass` column on the `Ship` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "IceClass" AS ENUM ('LU1', 'LU2', 'LU3', 'ARC4');

-- AlterTable
ALTER TABLE "Ship" DROP COLUMN "iceClass",
ADD COLUMN     "iceClass" "IceClass";

-- DropEnum
DROP TYPE "Role";
