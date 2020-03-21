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
    {
      id: user.id,
      name: user.name,
    },
    'some_secret_key',
    {
      expiresIn: '1h', // token will expire after 1 hour
    },
  );
  const message = addUserConnectedLog(user);

  pubsub.publish(USER_CONNECTED, { userConnected: { message, user } });
  res.cookie('jwt', token, { maxAge: 1000 * 60 * 60, httpOnly: true });
  return { message, user };
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
