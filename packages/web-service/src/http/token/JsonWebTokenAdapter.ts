import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { v1 } from '@ceuns-banck/domain';

export class JsonWebTokenAdapter implements v1.service.hash.token.IToken {
  create(input: v1.service.hash.token.InputCreateToken): string {
    return sign(input.data, input.secret, { algorithm: input.algorithm, expiresIn: input.expiresIn });
  }
  verify(input: v1.service.hash.token.InputVerifyToken): { id: number } | undefined {
    try {
      const result: { id: number } | JwtPayload | string = verify(input.token, input.secret, {
        algorithms: [input.algorithm],
      });
      if (typeof result != 'string') {
        const output: { id: number } = { id: result.id };
        return output;
      } else return undefined;
    } catch (error) {
      return undefined;
    }
  }
}
