import type { v1 } from '@ceuns-banck/domain';
import { clientPrisma } from '../../database/clientPrisma';

export class AccountRepositoryPrisma implements v1.accountTransaction.repositories.IAccountRepository {
  public async findFirst(
    input: v1.account.repositories.FindFisrtAccountRepositoryInput
  ): Promise<v1.account.repositories.AccountRepositoryOutput | undefined> {
    const result = await clientPrisma.account.findFirst({
      where: { typeId: input.typeId, userId: input.userId, id: input.id },
      include: { type: true },
    });

    if (!result) return undefined;

    return {
      id: result.id,
      date: result.date,
      typeId: result.typeId,
      value: result.value,
      userId: result.userId,
      type: result.type,
      limit: result.limit,
    };
  }
}
