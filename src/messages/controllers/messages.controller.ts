import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { Message } from "../models/message";
import { User } from "../models/user";
import { MessagesService } from "../services/MessagesService";


@Controller("messages")
export class MessagesController {
    constructor(private service: MessagesService) { }

    @Get()
    async retrieve(): Promise<Message[]> {
        return this.service.retrieve();
    }

    @Post()
    async create(
        @Req() request,
        @Body() message: Message): Promise<Message> {
        const user: User = request.user;
        return this.service.create(message, user);
    }
}