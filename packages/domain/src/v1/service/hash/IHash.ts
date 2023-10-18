export type InputCreateHash = {
  text: string;
  salt: Buffer;
  secret: string;
};

export type InputCompareHash = {
  text: string;
  hash: string;
  secret: string;
};

export interface IHash {
  create(input: InputCreateHash): Promise<string>;
  compare(input: InputCompareHash): Promise<boolean>;
}
