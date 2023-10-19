export type AccountTypeRepositoryOutput = {
  id: string;
  name: string;
};

export type FindFisrtAccountTypeRepositoryInput = {
  id: string;
};

export interface IAccountTypeRepository {
  findFirst(input: FindFisrtAccountTypeRepositoryInput): Promise<AccountTypeRepositoryOutput | undefined>;
}
