export type InputHttpAuthType = { authorization: string };
export type OutputHttpAuth = {
  statusCode: number;
};

export interface IHttpAuth {
  create(InputType: InputHttpAuthType): OutputHttpAuth;
}