import jwt from 'jsonwebtoken';
import User, { UserInterface } from './model';

export default {
  Query: {
    currentUser: (root: any, args: any, { user }: { user: UserInterface } ) => {
      if (!user) throw new Error('Not authenticated');
      return user;
    }
  },

  Mutation: {
    connect: async (root: any, { name }: UserInterface) => {
      const user: UserInterface = await User.findOne({ name })
        || await User.create({ name });
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
        },
        'some_secret_key',
        {
          expiresIn: '5m', // token will expire after 5 minutes
        },
      );

      return { token, user };
    },
  },
};
