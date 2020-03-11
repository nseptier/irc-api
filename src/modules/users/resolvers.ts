import jwt from 'jsonwebtoken';
import User, { UserInterface } from './model';
import bcrypt from 'bcrypt';

export default {
  Query: {
    currentUser: (root: any, args: any, { user }: { user: UserInterface } ) => {
      if (!user) throw new Error('Not authenticated');
      return user;
    }
  },

  Mutation: {
    register: async (root: any, data: UserInterface) => (
      await User.create(data)
    ),
    logIn: async (root: any, { name, password }: UserInterface) => {
      const user: UserInterface|null = await User.findOne({ name });

      if (!user) throw new Error('Invalid credentials');

      const isMatchingPassword = await bcrypt.compare(password, user.password);

      if (!isMatchingPassword) throw new Error('Invalid credentials');

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
  }
};
