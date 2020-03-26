import User from './model';
import { ResolverArgs } from 'modules/resolvers';

export const findOrCreateUser = async ({ name }: { name: string }) => (
  await User.findOne({ name }) || await User.create({ name })
);

export const getUser = async (id: string) => await User.findById(id);

export default {
  Query: {
    currentUser: (...[root, args, { currentUser }]: ResolverArgs) => {
      if (!currentUser) throw new Error('Not authenticated');
      return currentUser;
    },
  },
};
