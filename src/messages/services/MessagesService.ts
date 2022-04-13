import { BadRequestException, Injectable } from "@nestjs/common";
import { Message } from "../models/message";
import { User } from "../models/user";
import { MessagesRepository } from "../repositories/messages.repository";
import { ChatGateway } from "../sockets/chatGateway";


@Injectable()
export class MessagesService {
    constructor(private messagesDB: MessagesRepository,
        private chatGateway: ChatGateway) { }

    async retrieve(): Promise<Message[]> {
        return this.messagesDB.retrieve();
    }

    async create(message: Message, user: User): Promise<Message> {
        if (!message.text.trim()) {
            throw new BadRequestException();
        }

        message.moment = new Date();
        message.user = user;
        const newMessage = await this.messagesDB.create(message);

        // Emit websocket message
        this.chatGateway.emitMessage(newMessage);

        return newMessage;
    }

}
