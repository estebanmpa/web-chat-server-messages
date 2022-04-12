import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION_STRING, JWT_SECRET } from './common/config';
import { MessagesController } from './messages/controllers/messages.controller';
import { MessagesModule } from './messages/messages.module';
import { GetUserMiddleware } from './middlewares/getUser.middleware';

const modules = [MessagesModule];
const middlewares = [GetUserMiddleware];

@Module({
  imports: [
    ...modules,
    MongooseModule.forRoot(MONGO_CONNECTION_STRING),
    JwtModule.register({
      secret: JWT_SECRET
    }),
  ],
  exports: [JwtModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(...middlewares).forRoutes(MessagesController);
  }

}
