import { Factory } from 'fishery';

import { pool } from '../config/db';
import { IUser, UserDTO } from '../api/components/user/dto';

export const userFactory = Factory.define<IUser>(({ sequence, onCreate }) => {
	onCreate(
		(user) =>
			new Promise((resolve, reject) => {
				pool.query<IUser>(
					'INSERT INTO users (email, username) VALUES($1, $2) RETURNING *',
					[user.email, user.username],
					(err, res) => {
						if (err) return reject(err);
						resolve(res.rows[0]);
					}
				);
			})
	);

	return {
		id: sequence,
		email: 'john@doe.com',
		username: 'johndoe',
		created_at: new Date()
	};
});

export const userDTOFactory = Factory.define<UserDTO>(() => new UserDTO('john@doe.com', 'johndoe'));
