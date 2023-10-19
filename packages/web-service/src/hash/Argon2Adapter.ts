import { v1 } from '@ceuns-banck/domain';
import { hash, verify } from 'argon2';

export class Argon2Adapter implements v1.service.hash.hash.IHash {
  public async create(input: v1.service.hash.hash.InputCreateHash): Promise<string> {
    return await hash(input.text, {
      salt: input.salt,
      secret: Buffer.from(input.secret, 'utf-8'),
      type: 2,
    });
  }
  public async compare(input: v1.service.hash.hash.InputCompareHash): Promise<boolean> {
    return await verify(input.hash, input.text, { secret: Buffer.from(input.secret, 'utf-8') });
  }
}
