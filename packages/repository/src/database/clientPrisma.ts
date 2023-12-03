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
          await clientPrisma.accountTransaction.create({
            data: {
              accountId: exist.id,
              value: Number(exist.value) - (Number(data?.args?.data?.value) && 0),
              transactionTypeId: 'a',
            },
          });
        }

        return data.query(data.args);
      },
    },
  },
});
