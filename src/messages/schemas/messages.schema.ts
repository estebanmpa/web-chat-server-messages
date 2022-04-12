import * as mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema({
    seqNo: Number,
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    last_login: Date,
});

export const MessagesSchema = new mongoose.Schema({
    seqNo: Number,
    //_id: mongoose.Schema.Types.ObjectId, Commented to avoid document-must-have-an-id-before-saving
    text: String,
    moment: Date,
    user: { type: UsersSchema, required: true }
});
