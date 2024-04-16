import { AppSuccessResponse, AppErrorResponse } from './types';

export const successResponse = <Data>(
  data: Data,
): AppSuccessResponse<Data> => ({
  data,
  status: 200,
  success: true,
});

export const errorResponse = (
  code: number,
  message: string,
): AppErrorResponse => ({
  code,
  message,
  success: false,
});
