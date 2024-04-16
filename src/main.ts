import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import {
  HttpExceptionsFilter,
  ErrorExceptionsFilter,
  ForbiddenExceptionFilter,
} from './filters';
import { AppModule } from './modules/app/app.module';

const globalFilters = [
  new HttpExceptionsFilter(),
  new ErrorExceptionsFilter(),
  new ForbiddenExceptionFilter(),
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(...globalFilters);
  app.setGlobalPrefix('api');
  app.use(cookieParser());

  await app.listen(3000);
}

void bootstrap();
