import supertest from 'supertest';
import { createServer, Server as HttpServer } from 'http';

import { Server } from '../api/server';
import { AbsTestFactory } from './abs.factory';

export class HttpTestFactory extends AbsTestFactory {
	private readonly server: Server;
	private readonly http: HttpServer;

	constructor() {
		super();
		this.server = new Server();
		this.http = createServer(this.server.app);
	}

	get app() {
		return supertest(this.server.app);
	}

	close(cb: (err?: Error) => void) {
		this.http.close((err) => {
			if (err) return cb(err);
			this.disconnectDB(cb);
		});
	}

	prepare(cb: (err?: Error) => void) {
		this.connectDB((err) => {
			if (err) return cb(err);
			this.http.listen(process.env.NODE_PORT, cb);
		});
	}
}
