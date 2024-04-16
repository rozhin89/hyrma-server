import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../../auth';
import { successResponse } from '../../network';

import { DevService } from './dev.service';

@Controller('dev')
export class DevController {
  constructor(private readonly pingService: DevService) {}

  @Get('ping')
  getPong() {
    const data = this.pingService.pong();
    return successResponse(data);
  }

  @Get('exception')
  getException() {
    throw new Error('Test');
  }

  @Get('auth')
  @UseGuards(new AuthGuard())
  getAuth() {
    return successResponse('Guarded content');
  }
}
