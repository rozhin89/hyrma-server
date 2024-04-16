import { verify } from 'jsonwebtoken';

import { AppJwtPayload } from './types';
import { UNSAFE_JSON_KEY } from './constants';
// import { isNull } from "util";

export const parseBearerToken = (value: string) => {
  const parts = value.split(' ');

  if (parts.length !== 2) {
    throw new Error('Invalid authorization header');
  }

  if (parts[0] !== 'Bearer') {
    throw new Error('Invalid authorization header');
  }

  return parts[1];
};

const isAppJwtPayload = (data: unknown): data is AppJwtPayload => {
  if (data === null) {
    return false;
  }

  return typeof data === 'object';
};

export const validateToken = (jwtString: string): AppJwtPayload => {
  const result = verify(jwtString, UNSAFE_JSON_KEY);

  if (isAppJwtPayload(result)) {
    return result;
  }

  throw new Error('Unexpected JWT payload');
};
