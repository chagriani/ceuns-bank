export type AccountTransactionOutput = {
  id: string;
  accountId: string;
  type: string;
  date: Date;
  value: bigint;
};

export type FindManyAccountTransactionInput = {
  accountId: string;
};

export interface IAccountTransactionRepository {
  findMany(input: FindManyAccountTransactionInput): Promise<AccountTransactionOutput[]>;
}
