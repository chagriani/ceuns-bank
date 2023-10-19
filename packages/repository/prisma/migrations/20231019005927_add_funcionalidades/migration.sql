-- CreateTable
CREATE TABLE "userHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fisrtName" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountTypeId" TEXT NOT NULL,
    "userHistoryId" TEXT NOT NULL,
    "accountTypeHistoryId" TEXT NOT NULL,
    "value" BIGINT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accountHistory" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountTypeId" TEXT NOT NULL,
    "userHistoryId" TEXT NOT NULL,
    "value" BIGINT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accountHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accountType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accountType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accountTypeHistory" (
    "id" TEXT NOT NULL,
    "accountTypeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accountTypeHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accountTransaction" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "accountTransactionTypeId" TEXT NOT NULL,
    "accountTransactionTypeHistoryId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accountTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accountTransactionHistory" (
    "id" TEXT NOT NULL,
    "accountTransactionTypeHistoryId" TEXT NOT NULL,
    "accountTransactionId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "accountTransactionTypeId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accountTransactionHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accountTransactionType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accountTransactionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accountTransactionTypeHistory" (
    "id" TEXT NOT NULL,
    "accountTransactionTypeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accountTransactionTypeHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userHistoryId" TEXT NOT NULL,
    "cardTypeId" TEXT NOT NULL,
    "cardTypeHistoryId" TEXT NOT NULL,
    "isVirtual" BOOLEAN NOT NULL,
    "isCredit" BOOLEAN NOT NULL,
    "isDebit" BOOLEAN NOT NULL,
    "limit" BIGINT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cardHistory" (
    "id" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userHistoryId" TEXT NOT NULL,
    "cardTypeId" TEXT NOT NULL,
    "cardTypeHistoryId" TEXT NOT NULL,
    "isVirtual" BOOLEAN NOT NULL,
    "isCredit" BOOLEAN NOT NULL,
    "isDebit" BOOLEAN NOT NULL,
    "limit" BIGINT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cardHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cardType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cardType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cardTypeHistory" (
    "id" TEXT NOT NULL,
    "cardTypeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cardTypeHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userHistory" ADD CONSTRAINT "userHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_accountTypeId_fkey" FOREIGN KEY ("accountTypeId") REFERENCES "accountType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userHistoryId_fkey" FOREIGN KEY ("userHistoryId") REFERENCES "userHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_accountTypeHistoryId_fkey" FOREIGN KEY ("accountTypeHistoryId") REFERENCES "accountTypeHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accountHistory" ADD CONSTRAINT "accountHistory_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accountHistory" ADD CONSTRAINT "accountHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accountHistory" ADD CONSTRAINT "accountHistory_userHistoryId_fkey" FOREIGN KEY ("userHistoryId") REFERENCES "userHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accountTypeHistory" ADD CONSTRAINT "accountTypeHistory_accountTypeId_fkey" FOREIGN KEY ("accountTypeId") REFERENCES "accountType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accountTransaction" ADD CONSTRAINT "accountTransaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accountTransaction" ADD CONSTRAINT "accountTransaction_accountTransactionTypeId_fkey" FOREIGN KEY ("accountTransactionTypeId") REFERENCES "accountTransactionType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accountTransaction" ADD CONSTRAINT "accountTransaction_accountTransactionTypeHistoryId_fkey" FOREIGN KEY ("accountTransactionTypeHistoryId") REFERENCES "accountTransactionTypeHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accountTransactionHistory" ADD CONSTRAINT "accountTransactionHistory_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accountTransactionHistory" ADD CONSTRAINT "accountTransactionHistory_accountTransactionTypeId_fkey" FOREIGN KEY ("accountTransactionTypeId") REFERENCES "accountTransactionType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accountTransactionHistory" ADD CONSTRAINT "accountTransactionHistory_accountTransactionId_fkey" FOREIGN KEY ("accountTransactionId") REFERENCES "accountTransaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accountTransactionHistory" ADD CONSTRAINT "accountTransactionHistory_accountTransactionTypeHistoryId_fkey" FOREIGN KEY ("accountTransactionTypeHistoryId") REFERENCES "accountTransactionTypeHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accountTransactionTypeHistory" ADD CONSTRAINT "accountTransactionTypeHistory_accountTransactionTypeId_fkey" FOREIGN KEY ("accountTransactionTypeId") REFERENCES "accountTransactionType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_cardTypeId_fkey" FOREIGN KEY ("cardTypeId") REFERENCES "cardType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_userHistoryId_fkey" FOREIGN KEY ("userHistoryId") REFERENCES "userHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_cardTypeHistoryId_fkey" FOREIGN KEY ("cardTypeHistoryId") REFERENCES "cardTypeHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cardHistory" ADD CONSTRAINT "cardHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cardHistory" ADD CONSTRAINT "cardHistory_cardTypeId_fkey" FOREIGN KEY ("cardTypeId") REFERENCES "cardType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cardHistory" ADD CONSTRAINT "cardHistory_userHistoryId_fkey" FOREIGN KEY ("userHistoryId") REFERENCES "userHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cardHistory" ADD CONSTRAINT "cardHistory_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cardHistory" ADD CONSTRAINT "cardHistory_cardTypeHistoryId_fkey" FOREIGN KEY ("cardTypeHistoryId") REFERENCES "cardTypeHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cardTypeHistory" ADD CONSTRAINT "cardTypeHistory_cardTypeId_fkey" FOREIGN KEY ("cardTypeId") REFERENCES "cardType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
