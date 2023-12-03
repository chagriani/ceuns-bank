export type AccountRepositoryOutput = {
  id: string;
};

export type FindFisrtAccountRepositoryInput = {
  userId?: string;
  id?: string;
};
export interface IAccountRepository {
  findFirst(input: FindFisrtAccountRepositoryInput): Promise<AccountRepositoryOutput | undefined>;
}
