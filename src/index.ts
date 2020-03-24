import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';

import resolvers from 'modules/resolvers';
import typeDefs from 'modules/type-defs';
import { UserInterface } from 'modules/users/model';
import { getUser } from 'modules/users/resolvers';

const PORT = 4000;

const getCurrentUser = async (token: string) => {
    if (!token) return null;

    const decoded = jwt.verify(token, 'some_secret_key');

    return await getUser((decoded as any).id);
};

const server = new ApolloServer({
  context: ({ connection, req, res }) => {
    if (connection) return connection.context;

    const authHeader = req.headers.authorization || '';
    const token = authHeader.split(' ')[1];
    const currentUser = getCurrentUser(token);

    return { currentUser, req, res };
  },
  resolvers,
  typeDefs,
});

const app = express();
const httpServer = createServer(app);

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());

server.applyMiddleware({ app, cors: false });
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});

mongoose.connect('mongodb://127.0.0.1:27017/irc', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
