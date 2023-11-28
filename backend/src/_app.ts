import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express, { Application } from 'express';
import { sequelize } from './instances/sequelize';
import { appRouter } from './routes';
import { logger } from './utils/logger';

const app: Application = express();
const port = 8000;

app.use(cors());

app.use('/auth', trpcExpress.createExpressMiddleware({ router: appRouter }));

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

try {
  sequelize.authenticate();
  logger.info('Connection has been established successfully.');
} catch (error) {
  logger.error('Unable to connect to the database:', error);
}
