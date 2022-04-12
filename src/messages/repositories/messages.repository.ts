import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Message } from "../models/message";


@Injectable()
export class MessagesRepository {
    constructor(@InjectModel('Message') private messageModel: Model<Message>) { }

    async retrieve(): Promise<Message[]> {
        return this.messageModel.find();
    }

    async create(user: Partial<Message>): Promise<Message> {
        const newUser = new this.messageModel(user);
        await newUser.save();
        return newUser.toObject({ versionKey: false }); // versionKey false avoids internal mongoose properties used to track versions of the object
    }
}

