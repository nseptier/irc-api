import * as dotenv from 'dotenv-flow';
import cors from 'cors';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { schema } from 'modules/users/schema';

dotenv.config();

if (!process.env.PORT) process.exit(1);

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

mongoose.connect( `${process.env.DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

const server = app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`);
});

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
