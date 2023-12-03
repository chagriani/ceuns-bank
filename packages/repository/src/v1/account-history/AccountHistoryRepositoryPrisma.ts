import type { v1 } from '@ceuns-banck/domain';
import { clientPrisma } from '../../database/clientPrisma';

export class AccountHistoryRepositoryPrisma implements v1.accountHistory.repositories.IAccountHistoryRepository {
  public async findMany(
    input: v1.accountHistory.repositories.FindManyAccountHistoryRepositoryInput
  ): Promise<v1.accountHistory.repositories.AccountRepositoryHistoryOutput[]> {
    const result = await clientPrisma.accountHistory.findMany({
      where: {
        accountId: input.accountId,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return result.map((account) => ({
      id: account.id,
      date: account.date,
      value: account.value,
    }));
  }
}
