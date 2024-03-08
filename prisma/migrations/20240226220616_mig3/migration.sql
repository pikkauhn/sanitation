-- CreateTable
CREATE TABLE "_binTocustomer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_binTocustomer_A_fkey" FOREIGN KEY ("A") REFERENCES "bin" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_binTocustomer_B_fkey" FOREIGN KEY ("B") REFERENCES "customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "locationId" TEXT NOT NULL,
    "binId" TEXT NOT NULL,
    "days" INTEGER DEFAULT 0,
    "billable" TEXT,
    CONSTRAINT "customer_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_customer" ("billable", "binId", "days", "id", "locationId") SELECT "billable", "binId", "days", "id", "locationId" FROM "customer";
DROP TABLE "customer";
ALTER TABLE "new_customer" RENAME TO "customer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_binTocustomer_AB_unique" ON "_binTocustomer"("A", "B");

-- CreateIndex
CREATE INDEX "_binTocustomer_B_index" ON "_binTocustomer"("B");
