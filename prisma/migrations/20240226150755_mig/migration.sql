-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_location" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "notes" TEXT,
    "billable" TEXT,
    "days" INTEGER DEFAULT 0
);
INSERT INTO "new_location" ("address", "billable", "days", "id", "latitude", "longitude", "notes") SELECT "address", "billable", "days", "id", "latitude", "longitude", "notes" FROM "location";
DROP TABLE "location";
ALTER TABLE "new_location" RENAME TO "location";
CREATE TABLE "new_binHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "binId" TEXT NOT NULL,
    "charge" REAL NOT NULL DEFAULT 0,
    "locationId" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    CONSTRAINT "binHistory_binId_fkey" FOREIGN KEY ("binId") REFERENCES "bin" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "binHistory_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_binHistory" ("binId", "endDate", "id", "locationId", "startDate") SELECT "binId", "endDate", "id", "locationId", "startDate" FROM "binHistory";
DROP TABLE "binHistory";
ALTER TABLE "new_binHistory" RENAME TO "binHistory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
