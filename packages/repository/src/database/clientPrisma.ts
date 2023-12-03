import { PrismaClient, Prisma } from '@prisma/client';

export const clientPrisma = new PrismaClient().$extends({
  query: {
    account: {
      async update(data) {
        const exist = await clientPrisma.account.findFirst({ where: { id: data.args.where.id } });
        if (exist) {
          await clientPrisma.accountHistory.create({
            data: {
              typeId: exist.typeId,
              value: exist.value,
              date: exist.date,
              accountId: exist.id,
              limit: exist.limit,
            },
          });
          console.log(Number(data?.args?.data?.value?.toString()));
          await clientPrisma.accountTransaction.create({
            data: {
              accountId: exist.id,
              value: BigInt(exist.value) - BigInt(data?.args?.data?.value?.toString() || 0),
              transactionTypeId:
                BigInt(exist.value) - BigInt(data?.args?.data?.value?.toString() || 0) < 0 ? 'SAQUE' : 'DEPÓSITO',
            },
          });
        }

        return data.query(data.args);
      },
    },
  },
});
