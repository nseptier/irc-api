import * as dotenv from 'dotenv-flow';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

if (!process.env.PORT) process.exit(1);

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const server = app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`);
});

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
