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

export type FindManyAccountRepositoryInput = {
  userId?: string;
};

export type CreatetAccountRepositoryInput = {
  userId: string;
  typeId: string;
  value: bigint;
  limit: bigint;
};

export type UpdateAccountRepositoryInput = {
  id: string;
  value: bigint;
};

export interface IAccountRepository {
  findFirst(input: FindFisrtAccountRepositoryInput): Promise<AccountRepositoryOutput | undefined>;
  findMany(input: FindManyAccountRepositoryInput): Promise<AccountRepositoryOutput[]>;
  create(input: CreatetAccountRepositoryInput): Promise<boolean>;
  update(input: UpdateAccountRepositoryInput): Promise<boolean>;
}
