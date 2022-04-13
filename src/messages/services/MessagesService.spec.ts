import { Test } from "@nestjs/testing";
import { Message } from "../models/message";
import { User } from "../models/user";
import { MessagesRepository } from "../repositories/messages.repository";
import { ChatGateway } from "../sockets/chatGateway";
import { MessagesService } from "./MessagesService";

let service: MessagesService;

describe('MessagesService', () => {
    beforeEach(async () => {
        const fakeChatGateway: Partial<ChatGateway> = {
            emitMessage: (message: Message) => null
        }
        const fakeMessagesRepository: Partial<MessagesRepository> = {
            retrieve: () => Promise.resolve([
                { _id: "1", text: "Message1" } as unknown as Message,
                { _id: "2", text: "Message2" } as unknown as Message,
                { _id: "3", text: "Message3" } as unknown as Message
            ]),
            create: (message: Partial<Message>) => Promise.resolve({ _id: "1", text: message.text, user: message.user } as unknown as Message)
        }

        // Create the DI container
        const module = await Test.createTestingModule({
            providers: [
                MessagesService,
                { provide: MessagesRepository, useValue: fakeMessagesRepository },
                { provide: ChatGateway, useValue: fakeChatGateway }
            ]
        }).compile();

        service = module.get(MessagesService);
    })

    it('Can create an instance of Messages Service', async () => {
        expect(service).toBeDefined();
    });

    it('Returns messages list', async () => {
        const list = await service.retrieve();
        expect(list).toHaveLength(3);
    });

    it('Throws error if no text message', async () => {
        const m = {} as Message;
        const u = {} as User;
        m.text = "     ";
        try {
            await service.create(m, u);
        } catch (error) {
            const { response: { message } } = error;
            expect(message).toEqual("Bad Request");
        }
    });

    it('Creates a new message', async () => {
        const m = {} as Message;
        const u = {} as User;

        u.name = "Esteban";
        m.text = "Hello";

        const message = await service.create(m, u);
        expect(message.text).toEqual(m.text);
        expect(message.user.name).toEqual(u.name);
    });
});
