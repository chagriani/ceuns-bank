export type AccountRepositoryHistoryOutput = {
  id: string;
  value: bigint;
  date: Date;
};

export type FindManyAccountHistoryRepositoryInput = {
  accountId: string;
};

export interface IAccountHistoryRepository {
  findMany(input: FindManyAccountHistoryRepositoryInput): Promise<AccountRepositoryHistoryOutput[]>;
}
