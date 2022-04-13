import { Test } from "@nestjs/testing";
import { Message } from "../models/message";
import { User } from "../models/user";
import { MessagesService } from "../services/MessagesService";
import { MessagesController } from "./messages.controller";


describe('MessagesController', () => {
    let controller: MessagesController;

    beforeEach(async () => {
        const fakeMessagesService: Partial<MessagesService> = {
            retrieve: () => Promise.resolve([
                { _id: "1", text: "Message1" } as unknown as Message,
                { _id: "2", text: "Message2" } as unknown as Message,
                { _id: "3", text: "Message3" } as unknown as Message
            ]),
            create: (message: Message, user: User) => Promise.resolve({ _id: "1", text: message.text, user } as unknown as Message)
        }

        // Create the DI container
        const module = await Test.createTestingModule({
            providers: [
                MessagesService,
                { provide: MessagesService, useValue: fakeMessagesService }
            ],
            controllers: [MessagesController]
        }).compile();

        controller = module.get(MessagesController);
    });

    it('Can create an instance of Messages Controller', async () => {
        expect(controller).toBeDefined();
    });

    it('Returns messages list', async () => {
        const list = await controller.retrieve();
        expect(list).toHaveLength(3);
    });

    it('Creates a new message', async () => {
        const m = {} as Message;
        const u = {} as User;

        u.name = "Esteban";
        m.text = "Hello";

        const req = { user: u }

        const message = await controller.create(req, m);
        console.log(message)
        expect(message.text).toEqual(m.text);
        expect(message.user.name).toEqual(u.name);
    });
});