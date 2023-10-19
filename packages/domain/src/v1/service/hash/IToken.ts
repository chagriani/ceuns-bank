export type InputCreateToken = {
  data: any;
  secret: string;
  expiresIn: number;
  algorithm: 'HS512';
};

export type InputVerifyToken = {
  token: string;
  secret: string;
  algorithm: 'HS512';
};

export interface IToken {
  create(input: InputCreateToken): string;
  verify(input: InputVerifyToken): { id: number } | undefined;
}
