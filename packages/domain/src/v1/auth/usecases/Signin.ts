import { v1 } from '../../../index';

type Input = {
  password: string;
  email: string;
};

type Output = {
  user: {
    id: string;
    fisrtName: string;
    surname: string;
    email: string;
  };
  token: string;
};

export class Signin {
  constructor(
    private readonly hash: v1.service.hash.hash.IHash,
    private readonly token: v1.service.hash.token.IToken,
    private readonly userRepository: v1.auth.repositories.IUserRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    if (!input.password) v1.service.error.Erro.execute({ statusCode: 'Bad Request', message: 'Falta senha' });
    if (!input.email) v1.service.error.Erro.execute({ statusCode: 'Bad Request', message: 'Falta email' });

    const user = await this.userRepository.findFirst({
      email: input.email,
    });

    if (!user) v1.service.error.Erro.execute({ statusCode: 'Not Authorized', message: 'Usuário ou senha incorreto!' });

    //Compara hash's
    const result = await this.hash.compare({
      text: input.password,
      hash: user.password,
      secret: String(process.env.SECRET_HASH_USER),
    });

    if (!result)
      v1.service.error.Erro.execute({ statusCode: 'Not Authorized', message: 'Usuário ou senha incorreto!' });

    //Token
    const EXPIRATION_TOKEN_SECUNDS = 60 * 60; //60 minutos
    const token = this.token.create({
      algorithm: 'HS512',
      data: { id: user.id },
      expiresIn: EXPIRATION_TOKEN_SECUNDS,
      secret: String(process.env.SECRET_JWT_USER),
    });

    return {
      token,
      user: { id: user.id, email: user.email, fisrtName: user.fisrtName, surname: user.surname },
    };
  }
}
