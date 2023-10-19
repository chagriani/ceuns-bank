import mime from 'mime';
import { ResponseType } from '../IHttp';
import { IHttpTypeReponse, OutputHttpResponseType } from './IHttpTypeResponse';

export class HttpTypeResponse implements IHttpTypeReponse {
  public create(input?: ResponseType): OutputHttpResponseType {
    if (input) {
      const type = mime.getType(input);
      if (type)
        return {
          type,
        };
      else
        return {
          type: 'application/json',
        };
    } else
      return {
        type: 'application/json',
      };
  }
}
