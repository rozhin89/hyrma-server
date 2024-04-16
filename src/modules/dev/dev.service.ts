import { Injectable } from '@nestjs/common';

@Injectable()
export class DevService {
  pong() {
    return 'pong';
  }
}
