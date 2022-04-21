import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './common/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(configuration().listenPort);
}
bootstrap();
