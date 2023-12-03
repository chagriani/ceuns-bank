import { v1 } from '../../../index';

type Input = {
  userId: string;
  accountId: string;
};

type Output = {
  accountTransactions: {
    id: string;
    accountId: string;
    type: string;
    date: Date;
    value: bigint;
    real: string;
  }[];
};

export class Find {
  constructor(
    private readonly userRepository: v1.accountTransaction.repositories.IUserRepository,
    private readonly accountTransactionRepository: v1.accountTransaction.repositories.IAccountTransactionRepository,
    private readonly accountRepository: v1.accountTransaction.repositories.IAccountRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    if (!input.userId)
      v1.service.error.Erro.execute({ statusCode: 'Bad Request', message: 'Falta id usuário para criação da conta!' });

    const existUser = await this.userRepository.findFirst({ id: input.userId });
    if (!existUser) v1.service.error.Erro.execute({ statusCode: 'Not Found', message: 'Usuário inexistente!' });

    const account = await this.accountRepository.findFirst({ id: input.accountId });

    if (!account) v1.service.error.Erro.execute({ statusCode: 'Not Found', message: 'Conta inexistente!' });

    const accountTransactions = await this.accountTransactionRepository.findMany({ accountId: account.id });

    return {
      accountTransactions: accountTransactions.map((accountTransaction) => ({
        ...accountTransaction,
        ...{ real: v1.service.format.Currency.execute({ value: accountTransaction.value }) },
      })),
    };
  }
}
