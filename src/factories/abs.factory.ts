import { config } from 'dotenv';
import { join } from 'path';

config();

import { readFileSync } from 'fs';
import { Client } from 'pg';

export interface ITestFactory {
	close(cb: (err?: Error) => void): void;
	prepare(cb: (err?: Error) => void): void;
}

export abstract class AbsTestFactory implements ITestFactory {
	readonly dbClient: Client = new Client();

	private seed = readFileSync(join(__dirname, '../../db/scripts/create-tables.sql'), {
		encoding: 'utf-8'
	});

	constructor() {
		// Overwrite .env file entry
		process.env.PGDATABASE = 'nodejs_test';
	}

	abstract close(cb: (err?: Error) => void): void;
	abstract prepare(cb: (err?: Error) => void): void;

	protected connectDatabase(cb: (err?: Error) => void) {
		this.dbClient
			.connect()
			.then(() => {
				this.dbClient.query(this.seed, (err) => {
					if (err) return cb(err);
					cb();
				});
			})
			.catch((err) => {
				return cb(err);
			});
	}
}
