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

type RequestGetAccountTransaction = {
  query: { accountId: string; userId: string };
};

export class AccountTransactionController {
  constructor(
    private readonly http: IHttp,
    private readonly find: v1.accountTransaction.usecases.Find,
    private config?: { prefix?: string }
  ) {
    const prefix = this.config?.prefix ? this.config.prefix : '';

    this.http.on(
      'get',
      `${prefix}/user`,
      async ({ query: { accountId, userId } }: RequestGetAccountTransaction, res: any) => {
        const result = await this.find.execute({ accountId, userId });
        return result;
      }
    );
  }
}
