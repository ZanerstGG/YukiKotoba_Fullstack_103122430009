import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { KosakataModule } from './kosakata/kosakata.module.js';

@Module({
  imports: [KosakataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}