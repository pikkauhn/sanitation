/*
  Warnings:

  - You are about to drop the `_binHistoryTocustomer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_binHistoryTocustomer_B_index";

-- DropIndex
DROP INDEX "_binHistoryTocustomer_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_binHistoryTocustomer";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_binHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "binId" TEXT NOT NULL,
    "charge" REAL NOT NULL DEFAULT 0,
    "locationId" TEXT,
    "customerId" TEXT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    CONSTRAINT "binHistory_binId_fkey" FOREIGN KEY ("binId") REFERENCES "bin" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "binHistory_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "binHistory_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_binHistory" ("binId", "charge", "endDate", "id", "locationId", "startDate") SELECT "binId", "charge", "endDate", "id", "locationId", "startDate" FROM "binHistory";
DROP TABLE "binHistory";
ALTER TABLE "new_binHistory" RENAME TO "binHistory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
