import mongoose from 'mongoose';
import resolvers from 'modules/resolvers';
import typeDefs from './modules/type-defs';
import { ApolloServer, gql } from 'apollo-server';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4000);

mongoose.connect('mongodb://127.0.0.1:27017/irc', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
