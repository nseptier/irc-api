import jwt from 'jsonwebtoken';

import User, { UserInterface } from 'modules/users/model';
import { addUserConnectedLog } from 'modules/messages/resolvers';
import { findOrCreateUser } from 'modules/users/resolvers';
import { ResolverArgs } from 'modules/resolvers';

export const USER_CONNECTED = 'USER_CONNECTED';

export const connect = async (name: string, res: any) => {
  const user = await findOrCreateUser({ name });
  const message = addUserConnectedLog(user);

  return {
    ...createTokens(user, res),
    user,
  };
};

export const createTokens = (user: UserInterface, res: any) => {
  const token = jwt.sign(
    { id: user.id },
    'some_secret_key',
    { expiresIn: '15m' }, // Token will expire after 15 minutes
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    'some_secret_key',
    { expiresIn: '30d' }, // Refresh token will expire after 30 days
  );

  const decodedToken = jwt.decode(token, { json: true });

  res.cookie(
    'refreshToken',
    refreshToken,
    {
      maxAge: 1000 * 60 * 60 * 24 * 30, // Cookie will expire after 30 days
      httpOnly: true,
    },
  );

  return {
    token,
    tokenExpiry: decodedToken ? decodedToken.exp * 1000 : null,
  };
};

export default {
  Query: {
    accessToken: (...[root, args, { req, res }]: ResolverArgs) => {
      try {
        const decoded = jwt.verify(req.cookies.refreshToken, 'some_secret_key');

        return createTokens(decoded as UserInterface, res);
      } catch (e) {
        throw new Error('Not authenticated');
      }
    },
  },

  Mutation: {
    connect: (...[root, { name }, { req, res }]: ResolverArgs) => (
      connect(name, res)
    ),
  },
};
