import { Module } from "@nestjs/common";
import { MessagesController } from "./controllers/messages.controller";
import { MessagesRepository } from "./repositories/messages.repository";
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesSchema } from "./schemas/messages.schema";
import { MessagesService } from "./services/MessagesService";
import { ChatGateway } from "./sockets/chatGateway";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: "Message", schema: MessagesSchema }
        ]),
    ],
    controllers: [MessagesController],
    providers: [MessagesRepository, MessagesService, ChatGateway],
})
export class MessagesModule { }