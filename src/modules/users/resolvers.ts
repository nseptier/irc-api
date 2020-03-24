import { PubSub } from 'apollo-server-express';

import Message from 'modules/messages/model';
import User, { UserInterface } from './model';
import { addUserConnectedLog } from 'modules/messages/resolvers';
import { createTokens } from 'modules/auth/resolvers';

const pubsub = new PubSub();

export const USER_CONNECTED = 'USER_CONNECTED';

export const connect = async (
  root: any,
  { name }: UserInterface,
  { res }: any,
) => {
  const user: UserInterface = await User.findOne({ name })
    || await User.create({ name });

  const message = addUserConnectedLog(user);

  pubsub.publish(USER_CONNECTED, { userConnected: { message, user } });

  return {
    ...createTokens(user, res),
    user,
  };
};

export const getCurrentUser = (
  root: any,
  args: any,
  { currentUser }: { currentUser: UserInterface },
) => {
  if (!currentUser) throw new Error('Not authenticated');
  return currentUser;
};

export const getUser = async (id: string) => await User.findById(id);

export default {
  Query: {
    currentUser: getCurrentUser,
  },

  Mutation: {
    connect,
  },

  Subscription: {
    userConnected: {
      subscribe: () => pubsub.asyncIterator([USER_CONNECTED]),
    },
  },
};
