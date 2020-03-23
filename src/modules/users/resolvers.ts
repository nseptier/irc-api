import jwt from 'jsonwebtoken';
import Message from 'modules/messages/model';
import User, { UserInterface } from './model';
import { addUserConnectedLog } from 'modules/messages/resolvers';
import { PubSub } from 'apollo-server-express';

const pubsub = new PubSub();

export const USER_CONNECTED = 'USER_CONNECTED';

export const connect = async (
  root: any,
  { name }: UserInterface,
  { res }: any,
) => {
  const user: UserInterface = await User.findOne({ name })
    || await User.create({ name });
  const token = jwt.sign(
    { id: user.id, name: user.name },
    'some_secret_key',

    // Token will expire after 15 minutes
    { expiresIn: '15m' },
  );
  const message = addUserConnectedLog(user);

  pubsub.publish(USER_CONNECTED, { userConnected: { message, user } });
  return { token, user };
};

export const getCurrentUser = (
  root: any,
  args: any,
  { currentUser }: { currentUser: UserInterface }
) => {
  if (!currentUser) throw new Error('Not authenticated');
  return currentUser;
};

export const getUser = async (root: any, { id }: { id: string }) => (
  await User.findById(id)
);

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
