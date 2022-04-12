import { User } from "./user";

export interface Message {
    _id: String,
    text: String,
    moment: Date,
    user: User
}