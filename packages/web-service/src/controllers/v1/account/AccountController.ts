import { IHttp } from '../../../http/IHttp';
import { v1 } from '@ceuns-banck/domain';

type RequestPost = {
  body: {
    userId: string;
    typeId: string;
    value?: bigint;
  };
};

export class AccountController {
  constructor(
    private readonly http: IHttp,
    private readonly open: v1.account.usecases.Open,

    private config?: { prefix?: string }
  ) {
    const prefix = this.config?.prefix ? this.config.prefix : '';

    this.http.on(
      'post',
      `${prefix}/`,
      async ({ body: { typeId, userId, value } }: RequestPost, res: any) => {
        const result = await this.open.execute({ typeId, userId, value });
        return result;
      },
      { auth: ['Basic'] }
    );
  }
}
