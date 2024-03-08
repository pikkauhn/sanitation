-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "locationId" TEXT NOT NULL,
    "binId" TEXT NOT NULL,
    "days" INTEGER DEFAULT 0,
    "billable" TEXT,
    "binHistoryId" TEXT,
    CONSTRAINT "customer_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "customer_binId_fkey" FOREIGN KEY ("binId") REFERENCES "bin" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "customer_binHistoryId_fkey" FOREIGN KEY ("binHistoryId") REFERENCES "binHistory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_customer" ("billable", "binId", "days", "id", "locationId") SELECT "billable", "binId", "days", "id", "locationId" FROM "customer";
DROP TABLE "customer";
ALTER TABLE "new_customer" RENAME TO "customer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
