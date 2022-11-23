import express from 'express';
import { createServer, Server as HttpServer } from 'http';
import { config } from 'dotenv';

config();

import { Server } from './api/server';
import { pool } from './config/db';
import Logger from './config/logger';

pool
	.connect()
	.then(() => {
		const app: express.Application = new Server().app;
		const server: HttpServer = createServer(app);

		// Start express server
		server.listen(process.env.NODE_PORT);

		server.on('listening', () => {
			Logger.info(`node server is listening on port ${process.env.NODE_PORT}`);
		});
	})
	.catch((err) => {
		Logger.error(err.stack);
	});
