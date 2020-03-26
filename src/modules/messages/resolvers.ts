import Message, { MessageInterface } from './model';
import User, { UserInterface } from 'modules/users/model';
import { USER_CONNECTED } from 'modules/auth/resolvers';
import { getUser } from 'modules/users/resolvers';
import { PubSub } from 'apollo-server-express';

const pubsub = new PubSub();

export const MESSAGE_ADDED = 'MESSAGE_ADDED';

export const getAuthor = async (message: any) => (
  await getUser(message.authorId)
);

export const addMessage = async (
  root: any,
  { body }: MessageInterface,
  { currentUser }: { currentUser: UserInterface },
) => {
  if (!currentUser) throw new Error('Not authenticated');

  const message = await Message.create({ authorId: currentUser.id, body });

  pubsub.publish(MESSAGE_ADDED, { messageAdded: { message } });
  return { message };
};

export const addUserConnectedLog = async (user: UserInterface) => {
  return await Message.create({
    authorId: user.id,
    event: USER_CONNECTED,
    system: true,
  });
};

export const getMessages = async () => {
  const messages = await Message.find({});

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

  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator([MESSAGE_ADDED]),
    },
  },
};

