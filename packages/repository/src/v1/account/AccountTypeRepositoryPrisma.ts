import type { v1 } from '@ceuns-banck/domain';
import { clientPrisma } from '../../database/clientPrisma';

export class AccountTypeRepositoryPrisma implements v1.account.repositories.IAccountTypeRepository {
  public async findFirst(
    input: v1.account.repositories.FindFisrtAccountTypeRepositoryInput
  ): Promise<v1.account.repositories.AccountTypeRepositoryOutput | undefined> {
    const result = await clientPrisma.accountType.findFirst({ where: { id: input.id } });

    if (!result) return undefined;

    return {
      id: result.id,
      name: result.name,
    };
  }
}
