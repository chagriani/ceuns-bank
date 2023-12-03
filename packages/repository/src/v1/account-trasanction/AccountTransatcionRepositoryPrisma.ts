import type { v1 } from '@ceuns-banck/domain';
import { clientPrisma } from '../../database/clientPrisma';

export class AccountTransatcionRepositoryPrisma
  implements v1.accountTransaction.repositories.IAccountTransactionRepository
{
  public async findMany(
    input: v1.accountTransaction.repositories.FindManyAccountTransactionInput
  ): Promise<v1.accountTransaction.repositories.AccountTransactionOutput[]> {
    const result = await clientPrisma.accountTransaction.findMany({
      where: { accountId: input.accountId },
      orderBy: { date: 'desc' },
    });

    const output: v1.accountTransaction.repositories.AccountTransactionOutput[] = [];

    for (const iterator of result) {
      output.push({
        id: iterator.id,
        accountId: iterator.accountId,
        date: iterator.date,
        type: iterator.transactionTypeId,
        value: iterator.value,
      });
    }

    return output;
  }
}
