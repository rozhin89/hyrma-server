import { Module } from '@nestjs/common';

import { DevModule } from '../dev/dev.module';

@Module({
  imports: [DevModule],
  providers: [],
  controllers: [],
})
export class AppModule {}
