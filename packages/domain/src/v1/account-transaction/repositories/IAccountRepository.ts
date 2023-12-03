export type AccountRepositoryOutput = {
  id: string;
  userId: string;
  typeId: string;
  value: bigint;
  limit: bigint;
  date: Date;
  type: { id: string; name: string };
};

export type FindFisrtAccountRepositoryInput = {
  userId?: string;
  typeId?: string;
  id?: string;
};

export interface IAccountRepository {
  findFirst(input: FindFisrtAccountRepositoryInput): Promise<AccountRepositoryOutput | undefined>;
}
