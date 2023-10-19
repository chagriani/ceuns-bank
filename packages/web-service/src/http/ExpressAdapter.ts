import { IHttp, MethodType, AuthType, ResponseType } from './IHttp';
import { HttpAuthBasic } from './auth/HttpAuthBasic';
import { HttpTypeResponse } from './type-response/HttpTypeResponse';
import { JsonWebTokenAdapter } from './token/JsonWebTokenAdapter';
import express, { Request, Response, Express } from 'express';
import type { v1 } from '@ceuns-banck/domain';
import { join } from 'path';
import http from 'http';
import https from 'https';
import fs from 'fs';

export class ExpressAdapter implements IHttp {
  public app: Express;
  private parseUrl(url: string) {
    return url.replace(/\{/g, ':').replace(/\}/g, '');
  }

  constructor(
    private readonly httpAuthBasic: HttpAuthBasic,
    private readonly httpTypeResponse: HttpTypeResponse,
    private readonly jsonWebTokenAdapter: JsonWebTokenAdapter
  ) {
    this.app = express();
    this.app.use(express.json({ limit: '30mb' }));
    this.app.use(express.urlencoded({ limit: '30mb', extended: true }));

    /* this.app.register(fastifyMultipart); */

    this.app.use((req, reply, done) => {
      reply.header('Access-Control-Allow-Origin', '*');
      reply.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      done();
    });
  }

  public on(
    method: MethodType,
    url: string,
    callback: Function,
    config?: {
      auth: AuthType[];
      responseType?: ResponseType;
      bodyLimit?: number;
      multiPart?: {
        limits?: { fieldSize?: number };
        single?: { name: string };
        array?: { name: string; maxCount: number };
        fields?: { name: string; maxCount: number }[];
      };
      done?: boolean;
      returnDefault?: boolean;
    }
  ): void {
    this.app[method](
      this.parseUrl(url),
      (req: Request & { user?: { payload?: { id?: number } } }, reply: Response, done) => {
        const [, service] = url.split('/');

        if (!config) {
          done();
          return;
        }

        if (config.auth && config.auth.length != 0 && req.headers.authorization == undefined) {
          reply.status(401).send({
            error: 'Não autorizado!',
          });
          return;
        }
        if (req.headers.authorization) {
          const [nowType, token] = req.headers.authorization.split(' ');
          const existType = config.auth.find((type) => nowType === type);

          if (!existType) {
            reply.status(401).send({
              error: 'Não autorizado!',
            });
            return;
          }
          switch (existType) {
            case 'Bearer':
              const secret =
                service == 'transport'
                  ? String(process.env.SECRET_JWT_TRANSPORT)
                  : String(process.env.SECRET_JWT_VIEW_TRANSPORT);
              const result = this.jsonWebTokenAdapter.verify({
                algorithm: 'HS512',
                token,
                secret,
              });

              if (!result) {
                reply.status(401).send({
                  error: 'Não autorizado!',
                });
                return;
              }
              req.user = { payload: { id: result?.id } };
              done();
              break;
            case 'Basic':
              if (this.httpAuthBasic.create({ authorization: String(req.headers.authorization) }).statusCode == 200)
                done();
              else
                reply.status(401).send({
                  error: 'Não autorizado!',
                });
              return;
            default:
              reply.status(401).send({
                error: 'Não autorizado!',
              });
              return;
          }
        } else done();
      },
      async (req: Request, reply: Response, done) => {
        done();
      },
      async (req: Request, reply: Response, done) => {
        try {
          console.log(`${req.method} ${req.url}/${JSON.stringify(req.params)}\n${JSON.stringify(req.body)}`);
          const output = await callback(req, reply);

          if (config?.done) done();
          else {
            if (config?.returnDefault) {
              return reply.send(output);
            } else
              reply
                .type(
                  config
                    ? this.httpTypeResponse.create(config.responseType).type
                    : this.httpTypeResponse.create('json').type
                )
                .status(200)
                .send(
                  !config
                    ? { message: output }
                    : config.responseType == 'jpg' || config.responseType == 'png'
                    ? output
                    : { message: output }
                );
            return reply;
          }
        } catch (errorFirst) {
          console.log(errorFirst);
          try {
            if (errorFirst instanceof Error) {
              const result = JSON.parse(errorFirst.message);
              reply.status(result.statusCode).send(result);
            }
          } catch (error) {
            reply.status(500).send(errorFirst);
          }
        }
      }
    );
  }

  public listen(port: number, type: 'https' | 'http'): void {
    if (type == 'http')
      http.createServer(this.app).listen(port, '0.0.0.0', () => {
        console.log(`Express - Server running in 0.0.0.0:${port}`);
      });

    if (type == 'https') {
      const key = fs.readFileSync(`${__dirname}/cert/private.key`, 'utf8');
      const cert = fs.readFileSync(`${__dirname}/cert/certificate.crt`, 'utf8');
      const ca = fs.readFileSync(`${__dirname}/cert/ca_bundle.crt`, 'utf8');

      https.createServer({ key, cert, ca }, this.app).listen(port, '0.0.0.0', () => {
        console.log(`Express - Server running in 0.0.0.0:${port}`);
      });
    }
  }

  onPublic(): void {
    this.app.use(express.static(join(__dirname, '../../../../../public')));
  }
}
