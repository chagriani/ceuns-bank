import { IHttp } from '../../../http/IHttp';
import { v1 } from '@ceuns-banck/domain';

type RequestSignin = {
  body: {
    password: string;
    email: string;
  };
};

type RequestPost = {
  body: {
    password: string;
    fisrtName: string;
    surname: string;
    email: string;
  };
};

export class RouteController {
  constructor(
    private readonly http: IHttp,
    private readonly signin: v1.auth.usecases.Signin,
    private readonly createLogin: v1.auth.usecases.CreateLogin,
    private config?: { prefix?: string }
  ) {
    const prefix = this.config?.prefix ? this.config.prefix : '';

    this.http.on(
      'post',
      `${prefix}/signin`,
      async ({ body: { email, password } }: RequestSignin, res: any) => {
        const result = await this.signin.execute({ email, password });
        return result;
      },
      { auth: ['Basic'] }
    );

    this.http.on(
      'post',
      `${prefix}/`,
      async ({ body: { email, fisrtName, password, surname } }: RequestPost, res: any) => {
        const result = await this.createLogin.execute({
          email,
          fisrtName,
          password,
          surname,
        });
        return result;
      },
      { auth: ['Basic'] }
    );
  }
}
