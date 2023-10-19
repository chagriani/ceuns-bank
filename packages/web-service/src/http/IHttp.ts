export type MethodType = 'get' | 'post' | 'put' | 'delete' | 'patch';
export type AuthType = 'Bearer' | 'Basic';
export type ResponseType = 'png' | 'jpg' | 'json' | 'txt' | 'html' | 'webp' | 'pdf';

export interface IHttp {
  on(
    method: MethodType,
    url: string,
    callback: Function,
    config?: {
      auth?: AuthType[];
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
    },
  ): void;
  listen(port: number, type: 'https' | 'http'): void;
  onPublic(): void;
}