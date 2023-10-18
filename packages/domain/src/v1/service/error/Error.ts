export class Erro {
  static execute(input: {
    message: string;
    statusCode:
      | 'Not Found'
      | 'Internal Server Error'
      | 'Not Authorized'
      | 'Bad Request'
      | 'Too Many Requests'
      | 'Forbidden';
  }): never {
    var output = { message: '', statusCode: 500 };
    switch (input.statusCode) {
      case 'Internal Server Error':
        output = { message: input.message, statusCode: 500 };
        break;

      case 'Not Found':
        output = { message: input.message, statusCode: 404 };
        break;

      case 'Not Authorized':
        output = { message: input.message, statusCode: 401 };
        break;

      case 'Bad Request':
        output = { message: input.message, statusCode: 400 };
        break;

      case 'Too Many Requests':
        output = { message: input.message, statusCode: 429 };
        break;

      case 'Forbidden':
        output = { message: input.message, statusCode: 403 };
        break;
    }
    throw new Error(JSON.stringify(output));
  }
}
