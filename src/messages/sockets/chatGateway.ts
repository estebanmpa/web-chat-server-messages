import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Message } from "../models/message";


@WebSocketGateway({ cors: true, transports: ['websocket'] })
export class ChatGateway {
    @WebSocketServer()
    server;

    /**
    * Sends the notification for a new message
    * @param message 
    */
    emitMessage = (message: Message): void => {
        this.server.emit('message', message);
    }
}
