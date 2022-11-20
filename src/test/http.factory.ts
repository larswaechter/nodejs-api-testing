import express from 'express';
import supertest from 'supertest';
import { createServer, Server as HttpServer } from 'http';

import { Server } from '../api/server';
import { AbsTestFactory } from './abs.factory';

export class HttpTestFactory extends AbsTestFactory {
	private readonly server: Server;
	private readonly _app: express.Application;
	private readonly http: HttpServer;

	constructor() {
		super();
		this.server = new Server(this.dbClient);
		this._app = this.server.app;

		this.http = createServer(this._app);
	}

	get app() {
		return supertest(this._app);
	}

	close(cb: (err?: Error) => void) {
		this.dbClient.end((err) => {
			if (err) return cb(err);
			this.http.close((err) => {
				cb(err);
			});
		});
	}

	prepare(cb: (err?: Error) => void) {
		this.connectDatabase((err) => {
			if (err) return cb(err);
			this.http.listen(process.env.NODE_PORT, cb);
		});
	}
}
