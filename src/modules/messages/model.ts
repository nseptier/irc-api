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
    body: String,
    event: String,
    system: Boolean,
  },
  { timestamps: true },
);

const Message = model<MessageInterface>('Message', MessageSchema);

export default Message;
