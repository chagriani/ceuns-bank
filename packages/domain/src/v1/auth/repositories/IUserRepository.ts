export type UserAccessOutput = {
  id: string;
  fisrtName: string;
  surname: string;
  email: string;
  password: string;
};

export type FindFisrtUserRepositoryInput = {
  email: string;
};

export type CreatetUserRepositoryInput = {
  fisrtName: string;
  surname: string;
  email: string;
  password: string;
};

export interface IUserRepository {
  findFirst(input: FindFisrtUserRepositoryInput): Promise<UserAccessOutput | undefined>;
  create(input: CreatetUserRepositoryInput): Promise<boolean>;
}
