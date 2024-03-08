/*
  Warnings:

  - You are about to drop the column `billable` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `days` on the `location` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "locationId" TEXT NOT NULL,
    "binId" TEXT NOT NULL,
    "days" INTEGER DEFAULT 0,
    "billable" TEXT,
    CONSTRAINT "customer_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "customer_binId_fkey" FOREIGN KEY ("binId") REFERENCES "bin" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_location" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "notes" TEXT
);
INSERT INTO "new_location" ("address", "id", "latitude", "longitude", "notes") SELECT "address", "id", "latitude", "longitude", "notes" FROM "location";
DROP TABLE "location";
ALTER TABLE "new_location" RENAME TO "location";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
