import { Response } from 'express';
import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  ForbiddenException,
} from '@nestjs/common';

import { errorResponse } from '../network';

import { FORBIDDEN_SERVER_ERROR_MESSAGE } from './constants';

@Catch(Error)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    ctx
      .getResponse<Response>()
      .status(403)
      .json(errorResponse(500, FORBIDDEN_SERVER_ERROR_MESSAGE));
  }
}
