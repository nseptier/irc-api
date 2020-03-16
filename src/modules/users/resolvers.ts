import jwt from 'jsonwebtoken';
import User, { UserInterface } from './model';

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

    res.cookie('jwt', token, { maxAge: 1000 * 60 * 60, httpOnly: true });
    return { user };
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
};
