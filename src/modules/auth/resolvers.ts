import jwt from 'jsonwebtoken';

import { UserInterface } from 'modules/users/model';

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
    refreshAccessToken: (
      root: any,
      args: any,
      { req, res }: { req: any, res: any },
    ) => {
      try {
        const decoded = jwt.verify(req.cookies.refreshToken, 'some_secret_key');

        return createTokens(decoded as UserInterface, res);
      } catch (e) {
        throw new Error('Not authenticated');
      }
    },
  },
};
