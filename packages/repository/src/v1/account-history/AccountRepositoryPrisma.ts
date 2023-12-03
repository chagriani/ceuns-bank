import type { v1 } from '@ceuns-banck/domain';
import { clientPrisma } from '../../database/clientPrisma';

export class AccountRepositoryPrisma implements v1.accountHistory.repositories.IAccountRepository {
  public async findFirst(
    input: v1.accountHistory.repositories.FindFisrtAccountRepositoryInput
  ): Promise<v1.accountHistory.repositories.AccountRepositoryOutput | undefined> {
    const result = await clientPrisma.account.findFirst({
      where: {
        userId: input.userId,
        id: input.id,
      },
    });

    if (!result) return undefined;

    return {
      id: result.id,
    };
  }
}
