import { Document, model, Schema } from 'mongoose';

export interface MessageInterface extends Document {
  authorId: string,
  body: string,
};

const MessageSchema = new Schema(
  {
    authorId: {
      required: true,
      type: String,
    },
    body: {
      required: true,
      type: String,
    },
  },
  { timestamps: true },
);

const Message = model<MessageInterface>('Message', MessageSchema);

export default Message;
