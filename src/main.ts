import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LISTEN_PORT } from './common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(LISTEN_PORT);
}
bootstrap();
