import { v1 as v1Domain } from '@ceuns-banck/domain';
import { v1 as v1Repository } from '@ceuns-bank/repository';
import { controller, hash, http } from './index';
import { Argon2Adapter } from '../src/hash/index';
import { ExpressAdapter } from './http/ExpressAdapter';

export const httpExpress = () => {
  //Server
  const basicAuth = new http.auth.HttpAuthBasic();
  const responseType = new http.typeResponse.HttpTypeResponse();
  const token = new http.token.JsonWebTokenAdapter();
  const hash = new Argon2Adapter();
  const server = new ExpressAdapter(basicAuth, responseType, token);

  //Utils
  //const deliveryFormat = new v1Repository.service.DeliveryFormat();
  //const request = new AxiosAdapter();

  //const formatDate = new FormatDate();
  /*   const geocode = new converter.geocodeMapBox();
  const calculateGeoLib = new calculate.calculateGeoLib();
  const findGeoLib = new find.findGeoLib();
  const hashCrypto = new converter.hashCrypto(); */
  let version = '';
  //v1
  {
    version = 'v1';

    //Auth
    {
      //Repository
      const userRepositoryPrisma = new v1Repository.auth.UserRepositoryPrisma();

      //Use cases
      const signin = new v1Domain.auth.usecases.Signin(hash, token, userRepositoryPrisma);
      const createLogin = new v1Domain.auth.usecases.CreateLogin(hash, userRepositoryPrisma);

      //Controllers
      new controller.v1.auth.RouteController(server, signin, createLogin, { prefix: `/${version}/auth` });
    }
  }

  server.onPublic();

  return server;
};
