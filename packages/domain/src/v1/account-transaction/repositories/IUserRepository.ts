export type UserAccessOutput = {
  id: string;
};

export type FindFisrtUserRepositoryInput = {
  id: string;
};

export interface IUserRepository {
  findFirst(input: FindFisrtUserRepositoryInput): Promise<UserAccessOutput | undefined>;
}
