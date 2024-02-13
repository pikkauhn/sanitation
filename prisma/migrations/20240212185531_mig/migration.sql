/*
  Warnings:

  - You are about to drop the column `binId` on the `binSizes` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_bin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "size_id" TEXT,
    "location_id" TEXT,
    "status" TEXT NOT NULL,
    "last_emptied_at" DATETIME,
    CONSTRAINT "bin_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "binSizes" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "bin_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_bin" ("id", "last_emptied_at", "location_id", "status") SELECT "id", "last_emptied_at", "location_id", "status" FROM "bin";
DROP TABLE "bin";
ALTER TABLE "new_bin" RENAME TO "bin";
CREATE TABLE "new_binSizes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "size" TEXT NOT NULL,
    "charge" REAL NOT NULL
);
INSERT INTO "new_binSizes" ("charge", "id", "size") SELECT "charge", "id", "size" FROM "binSizes";
DROP TABLE "binSizes";
ALTER TABLE "new_binSizes" RENAME TO "binSizes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
