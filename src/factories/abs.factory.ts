import { join } from 'path';
import { readFileSync } from 'fs';

import { client } from '../config/db';

export interface ITestFactory {
	close(cb: (err?: Error) => void): void;
	prepare(cb: (err?: Error) => void): void;
}

export abstract class AbsTestFactory implements ITestFactory {
	private seed = readFileSync(join(__dirname, '../../db/scripts/create-tables.sql'), {
		encoding: 'utf-8'
	});

	constructor() {
		// Overwrite .env file entry
		process.env.PGDATABASE = 'nodejs_test';
	}

	abstract close(cb: (err?: Error) => void): void;
	abstract prepare(cb: (err?: Error) => void): void;

	protected disconnectDB(cb: (err?: Error) => void) {
		client.end(cb);
	}

	protected connectDB(cb: (err?: Error) => void) {
		client
			.connect()
			.then(() => {
				client.query(this.seed, (err) => {
					if (err) return cb(err);
					cb();
				});
			})
			.catch((err) => {
				return cb(err);
			});
	}
}