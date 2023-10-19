export type AccountRepositoryOutput = {
  id: string;
  userId: string;
  typeId: string;
  value: BigInt;
  date: Date;
};

export type FindFisrtAccountRepositoryInput = {
  userId: string;
  typeId: string;
};

export type CreatetAccountRepositoryInput = {
  userId: string;
  typeId: string;
  value: bigint;
};

export interface IAccountRepository {
  findFirst(input: FindFisrtAccountRepositoryInput): Promise<AccountRepositoryOutput | undefined>;
  create(input: CreatetAccountRepositoryInput): Promise<boolean>;
}
