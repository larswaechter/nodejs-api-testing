import { pool } from '../../../config/db';
import Logger from '../../../config/logger';

import { IUser, UserDTO } from './dto';

export class UserRepository {
	readAll(): Promise<IUser[]> {
		return new Promise((resolve, reject) => {
			pool.query<IUser>('SELECT * FROM users', (err, res) => {
				if (err) {
					Logger.error(err.message);
					reject('Failed to fetch users!');
				} else resolve(res.rows);
			});
		});
	}

	readByID(userID: number): Promise<IUser> {
		return new Promise((resolve, reject) => {
			pool.query<IUser>('SELECT * FROM users WHERE id = $1', [userID], (err, res) => {
				if (err) {
					Logger.error(err.message);
					reject('Failed to fetch user!');
				} else resolve(res.rowCount ? res.rows[0] : undefined);
			});
		});
	}

	readByEmailOrUsername(email: string, username: string): Promise<IUser> {
		return new Promise((resolve, reject) => {
			pool.query<IUser>('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username], (err, res) => {
				if (err) {
					Logger.error(err.message);
					reject('Failed to fetch user!');
				} else resolve(res.rowCount ? res.rows[0] : undefined);
			});
		});
	}

	create(user: UserDTO): Promise<IUser> {
		return new Promise((resolve, reject) => {
			pool.query(
				'INSERT INTO users (email, username) VALUES($1, $2) RETURNING *',
				[user.email, user.username],
				(err, res) => {
					if (err) {
						Logger.error(err.message);
						reject('Failed to create user!');
					} else resolve(res.rowCount ? res.rows[0] : undefined);
				}
			);
		});
	}

	delete(userID: number): Promise<boolean> {
		return new Promise((resolve, reject) => {
			pool.query<IUser>('DELETE FROM users WHERE id = $1', [userID], (err, res) => {
				if (err) {
					Logger.error(err.message);
					reject('Failed to delete user!');
				} else resolve(res.rowCount > 0);
			});
		});
	}
}
