import { IHttp } from '../../../http/IHttp';
import { v1 } from '@ceuns-banck/domain';

type RequestGet = {
  query: {
    accountId: string;
    id: string;
  };
};

export class AccountHistoryController {
  constructor(
    private readonly http: IHttp,
    private readonly find: v1.accountHistory.usecases.Find,
    private config?: { prefix?: string }
  ) {
    const prefix = this.config?.prefix ? this.config.prefix : '';

    this.http.on('get', `${prefix}/user`, async ({ query: { accountId, id } }: RequestGet, res: any) => {
      const result = await this.find.execute({ accountId, userId: id });
      return result;
    });
  }
}
