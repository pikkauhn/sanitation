/*
  Warnings:

  - Added the required column `charge` to the `bin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "location" ADD COLUMN "days" INTEGER;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_bin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "charge" REAL NOT NULL,
    "location_id" TEXT,
    "status" TEXT NOT NULL,
    "last_emptied_at" DATETIME,
    CONSTRAINT "bin_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_bin" ("capacity", "id", "last_emptied_at", "location_id", "status", "type") SELECT "capacity", "id", "last_emptied_at", "location_id", "status", "type" FROM "bin";
DROP TABLE "bin";
ALTER TABLE "new_bin" RENAME TO "bin";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
