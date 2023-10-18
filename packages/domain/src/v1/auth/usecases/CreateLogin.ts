import { v1 } from '../../../index';

type Input = {
  password: string;
  fisrtName: string;
  surname: string;
  email: string;
};

type Output = {
  user: boolean;
};

export class CreateLogin {
  constructor(
    private readonly hash: v1.service.hash.hash.IHash,
    private readonly userRepository: v1.auth.repositories.IUserRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    if (!input.password) v1.service.error.Erro.execute({ statusCode: 'Bad Request', message: 'Falta senha' });
    if (!input.email) v1.service.error.Erro.execute({ statusCode: 'Bad Request', message: 'Falta email' });
    if (!input.fisrtName) v1.service.error.Erro.execute({ statusCode: 'Bad Request', message: 'Falta primeiro nome' });
    if (!input.surname) v1.service.error.Erro.execute({ statusCode: 'Bad Request', message: 'Falta sobrenome' });

    const exist = await this.userRepository.findFirst({ email: input.email });

    if (exist)
      v1.service.error.Erro.execute({
        statusCode: 'Bad Request',
        message: `Usuário já existente com o email ${input.email}!`,
      });

    const hash = await this.hash.create({
      salt: Buffer.alloc(16, 'salt'), //Math.floor(Math.random() * 9) + 10,
      secret: String(process.env.SECRET_HASH_USER),
      text: input.password,
    });

    const save = await this.userRepository.create({
      email: input.email,
      fisrtName: input.fisrtName,
      password: hash,
      surname: input.surname,
    });

    return { user: save };
  }
}
