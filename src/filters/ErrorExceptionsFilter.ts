import { Response } from 'express';
import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';

import { errorResponse } from '../network';

import { UNHANDLED_SERVER_ERROR_MESSAGE } from './constants';

@Catch(Error)
export class ErrorExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    ctx
      .getResponse<Response>()
      .status(500)
      .json(errorResponse(500, UNHANDLED_SERVER_ERROR_MESSAGE));
  }
}
