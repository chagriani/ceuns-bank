import type { v1 } from '@ceuns-banck/domain';
import { Prisma } from '@prisma/client';
import { clientPrisma } from '../../database/clientPrisma';

export class UserRepositoryPrisma implements v1.auth.repositories.IUserRepository {
  public async findFirst(
    input: v1.auth.repositories.FindFisrtUserRepositoryInput
  ): Promise<v1.auth.repositories.UserAccessOutput | undefined> {
    const result = await clientPrisma.user.findFirst({
      where: {
        email: input.email,
      },
    });

    if (!result) return undefined;

    return {
      id: result.id,
      email: result.email,
      fisrtName: result.fisrtName,
      password: result.password,
      surname: result.surname,
    };
  }

  public async create(input: v1.auth.repositories.CreatetUserRepositoryInput): Promise<boolean> {
    const result = await clientPrisma.user.create({
      data: {
        email: input.email,
        fisrtName: input.fisrtName,
        password: input.password,
        surname: input.surname,
      },
    });

    return Boolean(result);
  }
}
