import { ResponseType } from '../IHttp';

export type OutputHttpResponseType = {
  type: string;
};

export interface IHttpTypeReponse {
  create(type?: ResponseType): OutputHttpResponseType;
}