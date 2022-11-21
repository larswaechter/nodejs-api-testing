import supertest from 'supertest';
import { createServer, Server as HttpServer } from 'http';

import { Server } from '../api/server';
import { AbsTestFactory } from './abs.factory';

export class MockTestFactory extends AbsTestFactory {
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
		this.http.close(cb);
	}

	prepare(cb: (err?: Error) => void) {
		this.http.listen(process.env.NODE_PORT, cb);
	}
}
