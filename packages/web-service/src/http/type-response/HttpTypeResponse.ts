import mime from 'mime';
import { ResponseType } from '../IHttp';
import { IHttpTypeReponse, OutputHttpResponseType } from './IHttpTypeResponse';

export class HttpTypeResponse implements IHttpTypeReponse {
  public create(input?: ResponseType): OutputHttpResponseType {
    return {
      type: 'application/json',
    };
  }
}
