import { Module } from '@nestjs/common';
import { KosakataService } from './kosakata.service.js';
import { KosakataController } from './kosakata.controller.js';

@Module({
  controllers: [KosakataController],
  providers: [KosakataService],
})
export class KosakataModule {}
