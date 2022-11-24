import { expect } from 'chai';

import { userDTOFactory, userFactory } from '../../../../factories/helper';
import { HttpTestFactory } from '../../../../factories/http.factory';
import { IUser, UserDTO } from '../dto';

describe('User component (HTTP)', () => {
	const factory: HttpTestFactory = new HttpTestFactory();
	const dummyUser: IUser = userFactory.build();
	const dummyUserDTO: UserDTO = userDTOFactory.build();

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

	test('GET /users (empty)', async () => {
		const res = await factory.app.get('/users').expect(200).expect('Content-Type', /json/);

		const users: IUser[] = res.body;
		expect(users).to.be.an('array');
		expect(users.length).eq(0);
	});

	test('GET /users/1 (404)', async () => {
		await factory.app.get('/users/1').expect(404);
	});

	test('DELETE /users/1 (404)', async () => {
		await factory.app.delete('/users/1').expect(404);
	});

	test('POST /users', async () => {
		const res = await factory.app.post('/users').send(dummyUserDTO).expect(201).expect('Content-Type', /json/);

		const user: IUser = res.body;
		expect(user).to.be.an('object');
		expect(user.id).eq(dummyUser.id);
		expect(user.email).eq(dummyUser.email);
		expect(user.username).eq(dummyUser.username);

		const count = await factory.getTableRowCount('users');
		expect(count).eq(1);
	});

	test('POST /users (400)', async () => {
		await factory.app.post('/users').send(dummyUserDTO).expect(201).expect('Content-Type', /json/);

		const count = await factory.getTableRowCount('users');
		expect(count).eq(1);

		await factory.app.post('/users').send(dummyUserDTO).expect(400);
	});

	test('GET /users', async () => {
		const newUser = await userFactory.create();
		const res = await factory.app.get('/users').expect(200).expect('Content-Type', /json/);

		const users: IUser[] = res.body;
		expect(users).to.be.an('array');
		expect(users.length).eq(1);

		const [user] = users;
		expect(user).to.be.an('object');
		expect(user.id).eq(newUser.id);
		expect(user.email).eq(newUser.email);
		expect(user.username).eq(newUser.username);
	});

	test('GET /users/:id', async () => {
		const newUser = await userFactory.create();
		const res = await factory.app.get(`/users/${newUser.id}`).expect(200).expect('Content-Type', /json/);

		const user: IUser = res.body;
		expect(user).to.be.an('object');
		expect(user.id).eq(newUser.id);
		expect(user.email).eq(newUser.email);
		expect(user.username).eq(newUser.username);
	});

	test('DELETE /users/:id', async () => {
		const newUser = await userFactory.create();
		await factory.app.delete(`/users/${newUser.id}`).expect(204);

		const count = await factory.getTableRowCount('users');
		expect(count).eq(0);
	});
});
