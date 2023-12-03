import { v1 } from '../../../index';

type Input = {
  userId: string;
  accountId: string;
};

type Output = {
  accountHistories: {
    id: string;
    value: bigint;
    date: Date;
    real: string;
  }[];
};

export class Find {
  constructor(
    private readonly userRepository: v1.accountHistory.repositories.IUserRepository,
    private readonly accountHistoryRepository: v1.accountHistory.repositories.IAccountHistoryRepository,
    private readonly accountRepository: v1.accountHistory.repositories.IAccountRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    if (!input.userId) v1.service.error.Erro.execute({ statusCode: 'Bad Request', message: 'Falta id usuário!' });
    if (!input.accountId) v1.service.error.Erro.execute({ statusCode: 'Bad Request', message: 'Falta id da conta!' });

    const existUser = await this.userRepository.findFirst({ id: input.userId });
    if (!existUser) v1.service.error.Erro.execute({ statusCode: 'Not Found', message: 'Usuário inexistente!' });

    const accounts = await this.accountRepository.findFirst({
      userId: input.userId,
      id: input.accountId,
    });

    if (!accounts)
      v1.service.error.Erro.execute({ statusCode: 'Not Found', message: 'Conta inexistente para este usuário!' });

    const accountHistories = await this.accountHistoryRepository.findMany({ accountId: accounts.id });

    return {
      accountHistories: accountHistories.map((accountHistory) => {
        return { ...accountHistory, real: `R$ ${Number(accountHistory.value) / 100}` };
      }),
    };
  }
}
