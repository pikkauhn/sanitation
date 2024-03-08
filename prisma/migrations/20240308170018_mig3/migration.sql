/*
  Warnings:

  - You are about to drop the column `size` on the `Bin` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "lastEmptiedAt" DATETIME,
    "binSizeId" TEXT,
    "customerId" TEXT,
    "locationId" TEXT,
    CONSTRAINT "Bin_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Bin_binSizeId_fkey" FOREIGN KEY ("binSizeId") REFERENCES "BinSize" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Bin_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Bin" ("binSizeId", "customerId", "id", "lastEmptiedAt", "locationId", "status") SELECT "binSizeId", "customerId", "id", "lastEmptiedAt", "locationId", "status" FROM "Bin";
DROP TABLE "Bin";
ALTER TABLE "new_Bin" RENAME TO "Bin";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
