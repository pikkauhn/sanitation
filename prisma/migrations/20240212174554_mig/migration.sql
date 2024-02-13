/*
  Warnings:

  - You are about to drop the column `type` on the `bin` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_bin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "size_id" TEXT,
    "location_id" TEXT,
    "status" TEXT NOT NULL,
    "last_emptied_at" DATETIME,
    "binSizesId" TEXT NOT NULL,
    CONSTRAINT "bin_binSizesId_fkey" FOREIGN KEY ("binSizesId") REFERENCES "binSizes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "bin_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_bin" ("binSizesId", "id", "last_emptied_at", "location_id", "size_id", "status") SELECT "binSizesId", "id", "last_emptied_at", "location_id", "size_id", "status" FROM "bin";
DROP TABLE "bin";
ALTER TABLE "new_bin" RENAME TO "bin";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
