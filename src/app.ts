import express, { Application, Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import AppError from '@errors/AppError';
import Database from './database';
import Container from './container';

const DEFAULT_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3333;

export default class App {
  public app: Application;

  constructor() {
    this.app = express();
  }

  async config(): Promise<void> {
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(cors());
  }

  async handleRoutes(): Promise<void> {
    this.app.use(routes);
  }

  async handleErrors(): Promise<void> {
    this.app.use(errors());
    this.app.use(
      (error: Error, request: Request, response: Response, _: NextFunction) => {
        if (error instanceof AppError) {
          return response
            .status(error.status)
            .json({ status: 'error', message: error.message });
        }

        console.log(error); //eslint-disable-line

        return response.status(500).json({ message: 'Internal server error' });
      },
    );
  }

  async initialize(): Promise<void> {
    await Database.connect();

    Container.registerDependencies();

    await this.config();

    await this.handleRoutes();

    await this.handleErrors();

    this.app.listen(DEFAULT_PORT, () => {
      console.log(`Server is running on port ${DEFAULT_PORT}`); //eslint-disable-line
    });
  }
}
