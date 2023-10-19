import basicAuth from 'basic-auth';
import { IHttpAuth, InputHttpAuthType, OutputHttpAuth } from './IHttpAuthBasic';

export class HttpAuthBasic implements IHttpAuth {
  public create(InputType: InputHttpAuthType): OutputHttpAuth {
    const credentials = basicAuth.parse(InputType.authorization);
    if (credentials === undefined) {
      return { statusCode: 401 };
    }
    if (credentials.name != process.env.API_USER || credentials.pass != process.env.API_PWD) {
      return {
        statusCode: 401,
      };
    }
    return {
      statusCode: 200,
    };
  }
}