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
      new controller.v1.auth.AuthController(server, signin, createLogin, { prefix: `/${version}/auth` });
    }

    //Account
    {
      //Repository
      const accountRepositoryPrisma = new v1Repository.account.AccountRepositoryPrisma();
      const accountTypeRepositoryPrisma = new v1Repository.account.AccountTypeRepositoryPrisma();
      const userRepositoryPrisma = new v1Repository.account.UserRepositoryPrisma();

      //Use cases
      const open = new v1Domain.account.usecases.Open(
        userRepositoryPrisma,
        accountTypeRepositoryPrisma,
        accountRepositoryPrisma
      );
      const deposit = new v1Domain.account.usecases.Transaction(userRepositoryPrisma, accountRepositoryPrisma);
      const Find = new v1Domain.account.usecases.Find(userRepositoryPrisma, accountRepositoryPrisma);

      //Controllers
      new controller.v1.account.AccountController(server, open, deposit, Find, { prefix: `/${version}/account` });
    }

    //Account History
    {
      //Repository
      const accountRepositoryPrisma = new v1Repository.accountHistory.AccountRepositoryPrisma();
      const accountHistoryRepositoryPrisma = new v1Repository.accountHistory.AccountHistoryRepositoryPrisma();
      const userRepositoryPrisma = new v1Repository.accountHistory.UserRepositoryPrisma();

      //Use cases
      const find = new v1Domain.accountHistory.usecases.Find(
        userRepositoryPrisma,
        accountHistoryRepositoryPrisma,
        accountRepositoryPrisma
      );

      //Controllers
      new controller.v1.accountHistory.AccountHistoryController(server, find, {
        prefix: `/${version}/account-history`,
      });
    }

    //Account Transac
    {
      //Repository
      const accountRepositoryPrisma = new v1Repository.accountTransaction.AccountRepositoryPrisma();
      const accountTransatcionRepositoryPrisma = new v1Repository.accountTransaction.AccountTransatcionRepositoryPrisma();
      const userRepositoryPrisma = new v1Repository.accountTransaction.UserRepositoryPrisma();

      //Use cases
      const find = new v1Domain.accountTransaction.usecases.Find(
        userRepositoryPrisma,
        accountTransatcionRepositoryPrisma,
        accountRepositoryPrisma
      );

      //Controllers
      new controller.v1.accountTransaction.AccountTransactionController(server, find, {
        prefix: `/${version}/account-transaction`,
      });
    }    
  }

  server.onPublic();

  return server;
};
