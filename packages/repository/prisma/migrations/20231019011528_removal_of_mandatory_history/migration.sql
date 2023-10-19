-- AlterTable
ALTER TABLE "account" ALTER COLUMN "userHistoryId" DROP NOT NULL,
ALTER COLUMN "accountTypeHistoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "accountHistory" ALTER COLUMN "userHistoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "accountTransaction" ALTER COLUMN "accountTransactionTypeHistoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "accountTransactionHistory" ALTER COLUMN "accountTransactionTypeHistoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "card" ALTER COLUMN "userHistoryId" DROP NOT NULL,
ALTER COLUMN "cardTypeHistoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "cardHistory" ALTER COLUMN "userHistoryId" DROP NOT NULL,
ALTER COLUMN "cardTypeHistoryId" DROP NOT NULL;
