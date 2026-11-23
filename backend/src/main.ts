import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validasi semua request body secara global berdasarkan aturan di DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // buang field yang tidak ada di DTO
      forbidNonWhitelisted: true, // tolak request yang membawa field asing
      transform: true, // ubah body menjadi instance class DTO
    }),
  );

  await app.listen(process.env.PORT ?? 3001);
}
await bootstrap();