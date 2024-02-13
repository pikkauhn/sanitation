/*
  Warnings:

  - You are about to drop the column `capacity` on the `bin` table. All the data in the column will be lost.
  - You are about to drop the column `charge` on the `bin` table. All the data in the column will be lost.
  - Added the required column `binSizesId` to the `bin` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "binSizes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "size" TEXT NOT NULL,
    "charge" REAL NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_bin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "size_id" TEXT,
    "location_id" TEXT,
    "status" TEXT NOT NULL,
    "last_emptied_at" DATETIME,
    "binSizesId" TEXT NOT NULL,
    CONSTRAINT "bin_binSizesId_fkey" FOREIGN KEY ("binSizesId") REFERENCES "binSizes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "bin_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_bin" ("id", "last_emptied_at", "location_id", "status", "type") SELECT "id", "last_emptied_at", "location_id", "status", "type" FROM "bin";
DROP TABLE "bin";
ALTER TABLE "new_bin" RENAME TO "bin";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
