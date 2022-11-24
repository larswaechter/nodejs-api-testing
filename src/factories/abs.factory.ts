import { join } from 'path';
import { PoolClient } from 'pg';
import { readFileSync } from 'fs';

import { pool } from '../config/db';

export interface ITestFactory {
	prepareEach(cb: (err?: Error) => void): void;
	closeEach(cb: (err?: Error) => void): void;
}

export abstract class AbsTestFactory implements ITestFactory {
	public poolClient: PoolClient;

	abstract prepareEach(cb: (err?: Error) => void): void;
	abstract closeEach(cb: (err?: Error) => void): void;

	public async getTableRowCount(name: string) {
		const { rows } = await this.poolClient.query(`SELECT COUNT(*) FROM ${this.poolClient.escapeIdentifier(name)};`);
		return rows.length ? +rows[0].count : 0;
	}

	protected connectPool(cb: (err?: Error) => void) {
		pool
			.connect()
			.then((poolClient) => {
				this.poolClient = poolClient;
				this.poolClient.query(this.seed, cb);
			})
			.catch(cb);
	}

	protected releasePoolClient() {
		this.poolClient.release(true);
	}

	protected endPool(cb: (err?: Error) => void) {
		pool.end(cb);
	}

	private seed = readFileSync(join(__dirname, '../../db/scripts/create-tables.sql'), {
		encoding: 'utf-8'
	});
}
