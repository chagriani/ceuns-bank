import type { v1 } from '@ceuns-banck/domain';
import { clientPrisma } from '../../database/clientPrisma';

export class UserRepositoryPrisma implements v1.account.repositories.IUserRepository {
  public async findFirst(
    input: v1.account.repositories.FindFisrtUserRepositoryInput
  ): Promise<v1.account.repositories.UserAccessOutput | undefined> {
    const result = await clientPrisma.user.findFirst({
      where: {
        id: input.id,
      },
    });

    if (!result) return undefined;

    return {
      id: result.id,
    };
  }
}
