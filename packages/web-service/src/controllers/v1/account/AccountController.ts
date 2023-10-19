import { IHttp } from '../../../http/IHttp';
import { v1 } from '@ceuns-banck/domain';

type RequestPost = {
  body: {
    typeId: string;
    value?: bigint;
  };
  user: { payload: { id: string } };
};

type RequestPostDeposit = {
  body: {
    accountId: string;
    value: bigint;
  };
  user: { payload: { id: string } };
};

export class AccountController {
  constructor(
    private readonly http: IHttp,
    private readonly open: v1.account.usecases.Open,
    private readonly transaction: v1.account.usecases.Transaction,
    private config?: { prefix?: string }
  ) {
    const prefix = this.config?.prefix ? this.config.prefix : '';

    this.http.on(
      'post',
      `${prefix}/`,
      async (
        {
          body: { typeId, value },
          user: {
            payload: { id },
          },
        }: RequestPost,
        res: any
      ) => {
        const result = await this.open.execute({ typeId, userId: id, value });
        return result;
      },
      { auth: ['Bearer'] }
    );

    this.http.on(
      'put',
      `${prefix}/transaction`,
      async (
        {
          body: { accountId, value },
          user: {
            payload: { id },
          },
        }: RequestPostDeposit,
        res: any
      ) => {
        const result = await this.transaction.execute({ accountId, userId: id, value });
        return result;
      },
      { auth: ['Bearer'] }
    );
  }
}
