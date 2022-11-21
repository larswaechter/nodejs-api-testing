/* eslint-disable @typescript-eslint/no-unused-vars */
import { Client } from 'pg';
import express, { json, Request, Response, NextFunction } from 'express';

import Logger from '../config/logger';
import { UserRoutes } from './components/user/routes';

export class Server {
	private readonly _app: express.Application = express();

	constructor() {
		this.registerMiddleware();
		this.registerRoutes();
		this.registerErrorHandler();
	}

	get app(): express.Application {
		return this._app;
	}

	private registerMiddleware() {
		this._app.use(json());
	}

	private registerRoutes() {
		this._app.get('/', (req: Request, res: Response) => res.send('Hello World!'));
		this._app.use('/users', new UserRoutes().router);
	}

	private registerErrorHandler() {
		this._app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
			Logger.error(err.stack || err);
			return res.status(500).json(err.message || err);
		});
	}
}
