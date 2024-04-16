import { HttpException } from '@nestjs/common';

import { errorResponse } from '../response/utils';

export class AppException extends HttpException {
  constructor(
    status: number,
    private errorCode: number = status,
    private errorMessage: string = '',
  ) {
    super('', status);
  }

  public getExceptionPayload() {
    return errorResponse(this.errorCode, this.errorMessage);
  }
}
