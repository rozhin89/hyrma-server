import { Request } from 'express';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { parseBearerToken, validateToken } from './utils';
import { AppJwtPayload } from './types';

const checkAppJwtPayload = async (payload: AppJwtPayload) => {
  return payload.password === 'test';
};

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const authHeader: string = request.header('authorization');

    if (!authHeader) {
      return false;
    }

    try {
      const jwtString = parseBearerToken(authHeader);
      const payload = validateToken(jwtString);
      return checkAppJwtPayload(payload);
    } catch (error) {
      return false;
    }
  }
}
