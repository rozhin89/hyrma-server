import {
  Catch,
  HttpException,
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

import { AppException, errorResponse } from '../network';

import { UNHANDLED_SERVER_ERROR_MESSAGE } from './constants';

const getExceptionPayload = (exception: HttpException) => {
  if (exception.getStatus() === 404) {
    return errorResponse(404, 'Method not found');
  }

  return exception instanceof AppException
    ? exception.getExceptionPayload()
    : errorResponse(500, UNHANDLED_SERVER_ERROR_MESSAGE);
};

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const status = exception.getStatus();
    const payload = getExceptionPayload(exception);

    ctx.getResponse<Response>().status(status).json(payload);
  }
}
