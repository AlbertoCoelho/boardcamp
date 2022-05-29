import express, {json} from 'express';
import chalk from 'chalk';
import cors from 'cors';

import router from './routes/index.js';

const server = express();

server.use(json());
server.use(cors());

server.use(router);

server.listen(process.env.PORT, () => {
  console.log(chalk.bold.green(`Listening on ${process.env.PORT}`));
});