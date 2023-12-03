import { IHttp } from '../../../http/IHttp';
import { v1 } from '@ceuns-banck/domain';

type RequestPost = {
  body: {
    typeId: string;
    value?: bigint;
    id: string;
  };
};

type RequestPostDeposit = {
  body: {
    accountId: string;
    userId: string;
    value: bigint;
    id: string;
  };
};

type RequestGetUser = {
  query: { id: string };
};

export class AccountController {
  constructor(
    private readonly http: IHttp,
    private readonly open: v1.account.usecases.Open,
    private readonly transaction: v1.account.usecases.Transaction,
    private readonly find: v1.account.usecases.Find,
    private config?: { prefix?: string }
  ) {
    const prefix = this.config?.prefix ? this.config.prefix : '';

    this.http.on('post', `${prefix}/`, async ({ body: { typeId, value, id } }: RequestPost, res: any) => {
      const result = await this.open.execute({ typeId, userId: id, value });
      return result;
    });

    this.http.on(
      'put',
      `${prefix}/transaction`,
      async ({ body: { accountId, value, id } }: RequestPostDeposit, res: any) => {
        const result = await this.transaction.execute({ accountId, userId: id, value });
        return result;
      }
    );

    this.http.on('get', `${prefix}/user`, async ({ query: { id } }: RequestGetUser, res: any) => {
      const result = await this.find.execute({ userId: id });
      return result;
    });
  }
}
