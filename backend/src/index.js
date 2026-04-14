import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import healthRouter from './routes/health.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { startServer } from './server.js';
import openapiSpecification from './docs/openapi.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to LMS API' });
});

app.use('/api/v1/health', healthRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(errorHandler);

startServer(app);

export default app;
