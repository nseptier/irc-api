import { PubSub } from 'apollo-server-express';

import Message, { MessageInterface } from './model';
import User, { UserInterface } from 'modules/users/model';
import { getUser } from 'modules/users/resolvers';
import { ResolverArgs } from 'modules/resolvers';
import { USER_CONNECTED } from 'modules/auth/resolvers';

const pubsub = new PubSub();

export const MESSAGE_ADDED = 'MESSAGE_ADDED';

export const getAuthor = async (message: any) => (
  await getUser(message.authorId)
);

export const addMessage = async (
  body: MessageInterface,
  currentUser?: UserInterface,
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
    author: (message: MessageInterface) => getAuthor(message),
  },

  Query: {
    messages: () => getMessages(),
  },

  Mutation: {
    addMessage: (...[root, { body }, { currentUser }]: ResolverArgs) => (
      addMessage(body, currentUser)
    ),
  },

  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator([MESSAGE_ADDED]),
    },
  },
};

