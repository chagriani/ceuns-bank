import type { v1 } from '@ceuns-banck/domain';
import { clientPrisma } from '../../database/clientPrisma';

export class AccountRepositoryPrisma implements v1.account.repositories.IAccountRepository {
  public async findFirst(
    input: v1.account.repositories.FindFisrtAccountRepositoryInput
  ): Promise<v1.account.repositories.AccountRepositoryOutput | undefined> {
    const result = await clientPrisma.account.findFirst({
      where: { typeId: input.typeId, userId: input.userId, id: input.id },
    });

    if (!result) return undefined;

    return {
      id: result.id,
      date: result.date,
      typeId: result.typeId,
      value: result.value,
      userId: result.userId,
    };
  }

  public async create(input: v1.account.repositories.CreatetAccountRepositoryInput): Promise<boolean> {
    const result = await clientPrisma.account.create({
      data: {
        value: input.value,
        userId: input.userId,
        typeId: input.typeId,
      },
    });

    return Boolean(result);
  }

  public async update(input: v1.account.repositories.UpdateAccountRepositoryInput): Promise<boolean> {
    const result = await clientPrisma.account.update({
      data: { value: input.value },
      where: { id: input.id },
    });

    return Boolean(result);
  }
}
