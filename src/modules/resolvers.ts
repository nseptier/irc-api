import merge from 'lodash.merge';

import authResolvers from 'modules/auth/resolvers';
import messageResolvers from 'modules/messages/resolvers';
import userResolvers from 'modules/users/resolvers';
import { UserInterface } from 'modules/users/model';

export type ResolverArgs = [
  any,
  any,
  {
    currentUser?: UserInterface,
    req?: any,
    res?: any,
  },
];

export default merge(
  authResolvers,
  messageResolvers,
  userResolvers,
);
