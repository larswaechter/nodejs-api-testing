import { expect } from 'chai';

import { HttpTestFactory } from '../../../../factories/http.factory';
import { IUser, UserDTO } from '../dto';

describe('User component (HTTP)', () => {
	const factory: HttpTestFactory = new HttpTestFactory();
	const dummyUser = new UserDTO('john@doe.com', 'johndoe');

	// Connect to DB && start Express Server
	beforeAll((done) => {
		factory.prepare((err?: Error) => {
			done(err);
		});
	});

	// Disconnect from DB && stop Express Server
	afterAll((done) => {
		factory.close(done);
	});

	it('GET /users', (done) => {
		factory.app
			.get('/users')
			.expect(200)
			.expect('Content-Type', /json/)
			.then((res) => {
				const users: IUser[] = res.body;

				expect(users).to.be.an('array');
				expect(users.length).eq(0);

				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	it('GET /users/1', (done) => {
		factory.app
			.get('/users/1')
			.expect(404)
			.then(() => {
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	it('DELETE /users/1', (done) => {
		factory.app
			.delete('/users/1')
			.expect(404)
			.then(() => {
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	it('POST /users', (done) => {
		factory.app
			.post('/users')
			.send(dummyUser)
			.expect(201)
			.expect('Content-Type', /json/)
			.then((res) => {
				const user: IUser = res.body;

				expect(user).to.be.an('object');
				expect(user.id).eq(1);
				expect(user.email).eq(dummyUser.email);
				expect(user.username).eq(dummyUser.username);

				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	it('POST /users', (done) => {
		factory.app
			.post('/users')
			.send(dummyUser)
			.expect(400)
			.then(() => {
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	it('GET /users', (done) => {
		factory.app
			.get('/users')
			.expect(200)
			.expect('Content-Type', /json/)
			.then((res) => {
				const users: IUser[] = res.body;

				expect(users).to.be.an('array');
				expect(users.length).eq(1);

				const user = users[0];
				expect(user).to.be.an('object');
				expect(user.id).eq(1);
				expect(user.email).eq(dummyUser.email);
				expect(user.username).eq(dummyUser.username);

				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	it('GET /users/1', (done) => {
		factory.app
			.get('/users/1')
			.expect(200)
			.expect('Content-Type', /json/)
			.then((res) => {
				const user: IUser = res.body;

				expect(user).to.be.an('object');
				expect(user.id).eq(1);
				expect(user.email).eq(dummyUser.email);
				expect(user.username).eq(dummyUser.username);

				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	it('DELETE /users/1', (done) => {
		factory.app
			.delete('/users/1')
			.expect(204)
			.then(() => {
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});
