import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import resolvers from 'modules/resolvers';
import typeDefs from './modules/type-defs';
import { ApolloServer, gql } from 'apollo-server';

const getUser = (token: string) => {
  if (!token) return null;
  try {
    return jwt.verify(token, 'some_secret_key');
  } catch (err) {
    return null;
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.split(' ')[1];
    const user = getUser(token);

    return { user };
  },
});

server.listen(4000);

mongoose.connect('mongodb://127.0.0.1:27017/irc', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
