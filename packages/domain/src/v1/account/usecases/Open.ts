import { v1 } from '../../../index';

type Input = {
  userId: string;
  typeId: string;
  value?: bigint;
};

type Output = {
  account: boolean;
};

export class Open {
  constructor(
    private readonly userRepository: v1.account.repositories.IUserRepository,
    private readonly accountTypeRepository: v1.account.repositories.IAccountTypeRepository,
    private readonly accountRepository: v1.account.repositories.IAccountRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    if (!input.userId)
      v1.service.error.Erro.execute({ statusCode: 'Bad Request', message: 'Falta id usuário para criação da conta!' });
    if (!input.typeId)
      v1.service.error.Erro.execute({ statusCode: 'Bad Request', message: 'Falta tipo de conta para criação!' });

    const existUser = await this.userRepository.findFirst({ id: input.userId });
    if (!existUser) v1.service.error.Erro.execute({ statusCode: 'Not Found', message: 'Usuário inexistente!' });

    const existType = await this.accountTypeRepository.findFirst({ id: input.typeId });
    if (!existType) v1.service.error.Erro.execute({ statusCode: 'Not Found', message: 'Tipo de conta inexistente!' });

    const existAccountUserType = await this.accountRepository.findFirst({ userId: input.userId, typeId: input.typeId });
    if (existAccountUserType)
      v1.service.error.Erro.execute({
        statusCode: 'Bad Request',
        message: 'Esse tipo de conta já está aberta para este usuário!',
      });

    const account = await this.accountRepository.create({
      typeId: input.typeId,
      userId: input.userId,
      value: input.value ?? BigInt(0),
    });

    return { account };
  }
}
