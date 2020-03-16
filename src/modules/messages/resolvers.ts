import Message, { MessageInterface } from './model';
import User, { UserInterface } from 'modules/users/model';
import { getUser } from 'modules/users/resolvers';

export const getAuthor = async (message: any) => (
  await getUser(null, { id: message.authorId })
);

export const addMessage = async (
  root: any,
  { body }: MessageInterface,
  { currentUser }: { currentUser: UserInterface },
) => {
  if (!currentUser) throw new Error('Not authenticated');

  const message = await Message.create({ authorId: currentUser.id, body });

  return { message };
};

export const getMessages = async (
  root: any,
  args: any,
  { currentUser }: { currentUser: UserInterface },
) => {
  const messages = await Message.find({});
console.info(messages);
  return messages;
};

export default {
  Message: {
    author: getAuthor,
  },

  Query: {
    messages: getMessages,
  },

  Mutation: {
    addMessage,
  },
};
