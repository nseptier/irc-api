import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import resolvers from 'modules/resolvers';
import typeDefs from 'modules/type-defs';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';

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
  context: ({ req, res }) => {
    const token = req.cookies.jwt;
    const currentUser = getUser(token);

    return { currentUser, req, res };
  },
});

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());

// @ts-ignore
server.applyMiddleware({ app, cors: false });

app.listen(4000);

mongoose.connect('mongodb://127.0.0.1:27017/irc', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
