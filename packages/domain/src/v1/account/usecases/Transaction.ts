import { v1 } from '../../../index';

type Input = {
  userId: string;
  accountId: string;
  value: bigint;
};

type Output = {
  account: boolean;
};

export class Transaction {
  constructor(
    private readonly userRepository: v1.account.repositories.IUserRepository,
    private readonly accountRepository: v1.account.repositories.IAccountRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    if (!input.userId)
      v1.service.error.Erro.execute({ statusCode: 'Bad Request', message: 'Falta id usuário para criação da conta!' });
    if (!input.accountId) v1.service.error.Erro.execute({ statusCode: 'Bad Request', message: 'Falta id da conta!' });
    if (!input.value)
      v1.service.error.Erro.execute({ statusCode: 'Bad Request', message: 'Falta valor para depósito!' });

    const existUser = await this.userRepository.findFirst({ id: input.userId });
    if (!existUser) v1.service.error.Erro.execute({ statusCode: 'Not Found', message: 'Usuário inexistente!' });

    const existAccountUser = await this.accountRepository.findFirst({
      userId: input.userId,
      id: input.accountId,
    });

    if (!existAccountUser)
      v1.service.error.Erro.execute({
        statusCode: 'Bad Request',
        message: 'Está conta não existe para o usuário logado!',
      });

    const result = await this.accountRepository.update({
      id: existAccountUser.id,
      value: existAccountUser.value + BigInt(input.value),
    });

    if (!result)
      v1.service.error.Erro.execute({
        statusCode: 'Internal Server Error',
        message: 'Erro ao efetuar depósito!',
      });

    return {
      account: result,
    };
  }
}
