import { httpExpress } from './server';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment      <-- Necessary for my ESLint setup
  // @ts-ignore: Unreachable code error                              <-- BigInt does not have `toJSON` method
BigInt.prototype.toJSON = function (): string {
    return this.toString();
  };
dotenv.config();

httpExpress().listen(Number(process.env.APIPORT), 'http');
