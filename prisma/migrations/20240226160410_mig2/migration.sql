/*
  Warnings:

  - You are about to drop the column `binHistoryId` on the `customer` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_binHistoryTocustomer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_binHistoryTocustomer_A_fkey" FOREIGN KEY ("A") REFERENCES "binHistory" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_binHistoryTocustomer_B_fkey" FOREIGN KEY ("B") REFERENCES "customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "locationId" TEXT NOT NULL,
    "binId" TEXT NOT NULL,
    "days" INTEGER DEFAULT 0,
    "billable" TEXT,
    CONSTRAINT "customer_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "customer_binId_fkey" FOREIGN KEY ("binId") REFERENCES "bin" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_customer" ("billable", "binId", "days", "id", "locationId") SELECT "billable", "binId", "days", "id", "locationId" FROM "customer";
DROP TABLE "customer";
ALTER TABLE "new_customer" RENAME TO "customer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_binHistoryTocustomer_AB_unique" ON "_binHistoryTocustomer"("A", "B");

-- CreateIndex
CREATE INDEX "_binHistoryTocustomer_B_index" ON "_binHistoryTocustomer"("B");
