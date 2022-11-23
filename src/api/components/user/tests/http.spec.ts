import { expect } from 'chai';

import { HttpTestFactory } from '../../../../factories/http.factory';
import { IUser, UserDTO } from '../dto';

describe('User component (HTTP)', () => {
	const factory: HttpTestFactory = new HttpTestFactory();
	const dummyUser = new UserDTO('john@doe.com', 'johndoe');

	// Connect to pool && start Express Server
	beforeEach((done) => {
		factory.prepareEach(done);
	});

	// Release pool client && stop Express Server
	afterEach((done) => {
		factory.closeEach(done);
	});

	// End pool
	afterAll((done) => {
		factory.closeAll(done);
	});

	test('get empty users', (done) => {
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

	test('get 404', (done) => {
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

	test('get 404', (done) => {
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

	test('create, read & delete user', async () => {
		const postRes = await factory.app.post('/users').send(dummyUser).expect(201).expect('Content-Type', /json/);

		const postResUser: IUser = postRes.body;
		expect(postResUser).to.be.an('object');
		expect(postResUser.id).eq(1);
		expect(postResUser.email).eq(dummyUser.email);
		expect(postResUser.username).eq(dummyUser.username);

		await factory.app.post('/users').send(dummyUser).expect(400);

		const getRes = await factory.app.get('/users').expect(200).expect('Content-Type', /json/);

		const getResUsers: IUser[] = getRes.body;
		expect(getResUsers).to.be.an('array');
		expect(getResUsers.length).eq(1);

		const getResUser = getResUsers[0];
		expect(getResUser).to.be.an('object');
		expect(getResUser.id).eq(1);
		expect(getResUser.email).eq(dummyUser.email);
		expect(getResUser.username).eq(dummyUser.username);

		const getRes2 = await factory.app.get('/users/1').expect(200).expect('Content-Type', /json/);

		const getRes2User: IUser = getRes2.body;
		expect(getRes2User).to.be.an('object');
		expect(getRes2User.id).eq(1);
		expect(getRes2User.email).eq(dummyUser.email);
		expect(getRes2User.username).eq(dummyUser.username);

		await factory.app.delete('/users/1').expect(204);
		await factory.app.get('/users/1').expect(404);
	});
});
