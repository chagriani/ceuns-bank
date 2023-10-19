/*
  Warnings:

  - You are about to drop the column `accountTypeHistoryId` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `accountTypeId` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `accountTypeId` on the `accountHistory` table. All the data in the column will be lost.
  - You are about to drop the column `accountTransactionTypeHistoryId` on the `accountTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `accountTransactionTypeId` on the `accountTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `accountTransactionId` on the `accountTransactionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `accountTransactionTypeHistoryId` on the `accountTransactionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `accountTransactionTypeId` on the `accountTransactionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `accountTypeId` on the `accountTypeHistory` table. All the data in the column will be lost.
  - You are about to drop the column `cardTypeHistoryId` on the `card` table. All the data in the column will be lost.
  - You are about to drop the column `cardTypeId` on the `card` table. All the data in the column will be lost.
  - You are about to drop the column `cardTypeHistoryId` on the `cardHistory` table. All the data in the column will be lost.
  - You are about to drop the column `cardTypeId` on the `cardHistory` table. All the data in the column will be lost.
  - You are about to drop the column `cardTypeId` on the `cardTypeHistory` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `accountHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionTypeId` to the `accountTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `accountTransactionHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionTypeId` to the `accountTransactionHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `accountTypeHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `cardHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `cardTypeHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_accountTypeHistoryId_fkey";

-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_accountTypeId_fkey";

-- DropForeignKey
ALTER TABLE "accountTransaction" DROP CONSTRAINT "accountTransaction_accountTransactionTypeHistoryId_fkey";

-- DropForeignKey
ALTER TABLE "accountTransaction" DROP CONSTRAINT "accountTransaction_accountTransactionTypeId_fkey";

-- DropForeignKey
ALTER TABLE "accountTransactionHistory" DROP CONSTRAINT "accountTransactionHistory_accountTransactionId_fkey";

-- DropForeignKey
ALTER TABLE "accountTransactionHistory" DROP CONSTRAINT "accountTransactionHistory_accountTransactionTypeHistoryId_fkey";

-- DropForeignKey
ALTER TABLE "accountTransactionHistory" DROP CONSTRAINT "accountTransactionHistory_accountTransactionTypeId_fkey";

-- DropForeignKey
ALTER TABLE "accountTypeHistory" DROP CONSTRAINT "accountTypeHistory_accountTypeId_fkey";

-- DropForeignKey
ALTER TABLE "card" DROP CONSTRAINT "card_cardTypeHistoryId_fkey";

-- DropForeignKey
ALTER TABLE "card" DROP CONSTRAINT "card_cardTypeId_fkey";

-- DropForeignKey
ALTER TABLE "cardHistory" DROP CONSTRAINT "cardHistory_cardTypeHistoryId_fkey";

-- DropForeignKey
ALTER TABLE "cardHistory" DROP CONSTRAINT "cardHistory_cardTypeId_fkey";

-- DropForeignKey
ALTER TABLE "cardTypeHistory" DROP CONSTRAINT "cardTypeHistory_cardTypeId_fkey";

-- AlterTable
ALTER TABLE "account" DROP COLUMN "accountTypeHistoryId",
DROP COLUMN "accountTypeId",
ADD COLUMN     "typeHistoryId" TEXT,
ADD COLUMN     "typeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "accountHistory" DROP COLUMN "accountTypeId",
ADD COLUMN     "typeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "accountTransaction" DROP COLUMN "accountTransactionTypeHistoryId",
DROP COLUMN "accountTransactionTypeId",
ADD COLUMN     "transactionTypeHistoryId" TEXT,
ADD COLUMN     "transactionTypeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "accountTransactionHistory" DROP COLUMN "accountTransactionId",
DROP COLUMN "accountTransactionTypeHistoryId",
DROP COLUMN "accountTransactionTypeId",
ADD COLUMN     "transactionId" TEXT NOT NULL,
ADD COLUMN     "transactionTypeHistoryId" TEXT,
ADD COLUMN     "transactionTypeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "accountTypeHistory" DROP COLUMN "accountTypeId",
ADD COLUMN     "typeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "card" DROP COLUMN "cardTypeHistoryId",
DROP COLUMN "cardTypeId",
ADD COLUMN     "typeHistoryId" TEXT,
ADD COLUMN     "typeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "cardHistory" DROP COLUMN "cardTypeHistoryId",
DROP COLUMN "cardTypeId",
ADD COLUMN     "typeHistoryId" TEXT,
ADD COLUMN     "typeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "cardTypeHistory" DROP COLUMN "cardTypeId",
ADD COLUMN     "typeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "accountType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_typeHistoryId_fkey" FOREIGN KEY ("typeHistoryId") REFERENCES "accountTypeHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accountTypeHistory" ADD CONSTRAINT "accountTypeHistory_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "accountType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accountTransaction" ADD CONSTRAINT "accountTransaction_transactionTypeId_fkey" FOREIGN KEY ("transactionTypeId") REFERENCES "accountTransactionType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accountTransaction" ADD CONSTRAINT "accountTransaction_transactionTypeHistoryId_fkey" FOREIGN KEY ("transactionTypeHistoryId") REFERENCES "accountTransactionTypeHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accountTransactionHistory" ADD CONSTRAINT "accountTransactionHistory_transactionTypeId_fkey" FOREIGN KEY ("transactionTypeId") REFERENCES "accountTransactionType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accountTransactionHistory" ADD CONSTRAINT "accountTransactionHistory_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "accountTransaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accountTransactionHistory" ADD CONSTRAINT "accountTransactionHistory_transactionTypeHistoryId_fkey" FOREIGN KEY ("transactionTypeHistoryId") REFERENCES "accountTransactionTypeHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "cardType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_typeHistoryId_fkey" FOREIGN KEY ("typeHistoryId") REFERENCES "cardTypeHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cardHistory" ADD CONSTRAINT "cardHistory_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "cardType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cardHistory" ADD CONSTRAINT "cardHistory_typeHistoryId_fkey" FOREIGN KEY ("typeHistoryId") REFERENCES "cardTypeHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cardTypeHistory" ADD CONSTRAINT "cardTypeHistory_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "cardType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
