import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './common/configuration';
import { MessagesController } from './messages/controllers/messages.controller';
import { MessagesModule } from './messages/messages.module';
import { GetUserMiddleware } from './middlewares/getUser.middleware';

const modules = [MessagesModule];
const middlewares = [GetUserMiddleware];

@Module({
  imports: [
    ...modules,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return { uri: configService.get('database.connectionString') };
      },
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return { secret: configService.get('jwtSecret') }
      },
      inject: [ConfigService],
    }),
  ],
  exports: [JwtModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(...middlewares).forRoutes(MessagesController);
  }

}
