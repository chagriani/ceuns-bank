import { v1 } from '../../../index';

type Input = {
  userId: string;
};

type Output = {
  accounts: {
    id: string;
    userId: string;
    typeId: string;
    value: bigint;
    real: string;
    date: Date;
    type: { id: string; name: string };
  }[];
};

export class Find {
  constructor(
    private readonly userRepository: v1.account.repositories.IUserRepository,
    private readonly accountRepository: v1.account.repositories.IAccountRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    if (!input.userId)
      v1.service.error.Erro.execute({ statusCode: 'Bad Request', message: 'Falta id usuário para criação da conta!' });

    const existUser = await this.userRepository.findFirst({ id: input.userId });
    if (!existUser) v1.service.error.Erro.execute({ statusCode: 'Not Found', message: 'Usuário inexistente!' });

    const accounts = await this.accountRepository.findMany({
      userId: input.userId,
    });

    return {
      accounts: accounts.map((account) => ({
        ...account,
        ...{ real: v1.service.format.Currency.execute({ value: account.value }) },
      })),
    };
  }
}
