import authResolvers from 'modules/auth/resolvers';
import messageResolvers from 'modules/messages/resolvers';
import userResolvers from 'modules/users/resolvers';
import merge from 'lodash.merge';

export default merge(
  authResolvers,
  messageResolvers,
  userResolvers,
);
