-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_oTP" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "isVerified" BOOLEAN DEFAULT false,
    "code" TEXT NOT NULL,
    "expirationDateTime" DATETIME NOT NULL,
    CONSTRAINT "oTP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_oTP" ("code", "expirationDateTime", "id", "isVerified", "userId") SELECT "code", "expirationDateTime", "id", "isVerified", "userId" FROM "oTP";
DROP TABLE "oTP";
ALTER TABLE "new_oTP" RENAME TO "oTP";
CREATE UNIQUE INDEX "oTP_code_key" ON "oTP"("code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
