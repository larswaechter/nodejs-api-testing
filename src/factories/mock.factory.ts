import supertest from 'supertest';
import { createServer, Server as HttpServer } from 'http';

import { Server } from '../api/server';
import { AbsTestFactory } from './abs.factory';

export class MockTestFactory extends AbsTestFactory {
	private readonly server: Server = new Server();
	private readonly http: HttpServer = createServer(this.server.app);

	get app() {
		return supertest(this.server.app);
	}

	prepareEach(cb: (err?: Error) => void) {
		this.http.listen(process.env.NODE_PORT, cb);
	}

	closeEach(cb: (err?: Error) => void) {
		this.http.close(cb);
	}
}
