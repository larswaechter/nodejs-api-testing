import { expect as cExpect } from 'chai';

import { userDTOFactory, userFactory } from '../../../../factories/helper';
import { MockTestFactory } from '../../../../factories/mock.factory';
import { IUser } from '../dto';

const dummyUser = userFactory.build();
const dummyUserDTO = userDTOFactory.build();

const mockReadAll = jest.fn().mockResolvedValue([dummyUser]);
const mockReadByID = jest
	.fn()
	.mockResolvedValueOnce(dummyUser)
	.mockResolvedValueOnce(dummyUser)
	.mockResolvedValue(undefined);
const mockCreate = jest.fn().mockResolvedValue(dummyUser);
const mockReadByEmailOrUsername = jest.fn().mockResolvedValueOnce(undefined).mockResolvedValueOnce(dummyUser);
const mockDelete = jest.fn().mockResolvedValue(true);

jest.mock('../repository', () => ({
	UserRepository: jest.fn().mockImplementation(() => ({
		readAll: mockReadAll,
		readByID: mockReadByID,
		readByEmailOrUsername: mockReadByEmailOrUsername,
		create: mockCreate,
		delete: mockDelete
	}))
}));

describe('User component (MOCK)', () => {
	const factory: MockTestFactory = new MockTestFactory();

	// Start Express Server
	beforeEach((done) => {
		factory.prepareEach(done);
	});

	// Stop Express Server
	afterEach((done) => {
		factory.closeEach(done);
	});

	test('POST /users', async () => {
		const res = await factory.app.post('/users').send(dummyUserDTO).expect(201).expect('Content-Type', /json/);

		const user: IUser = res.body;
		cExpect(user).to.be.an('object');
		cExpect(user.id).eq(dummyUser.id);
		cExpect(user.email).eq(dummyUser.email);
		cExpect(user.username).eq(dummyUser.username);

		expect(mockCreate).toHaveBeenCalledTimes(1);
		expect(mockReadByEmailOrUsername).toHaveBeenCalledTimes(1);
	});

	test('POST /users (400)', async () => {
		await factory.app.post('/users').send(dummyUserDTO).expect(400);

		expect(mockCreate).toHaveBeenCalledTimes(1);
		expect(mockReadByEmailOrUsername).toHaveBeenCalledTimes(2);
	});

	test('GET /users', async () => {
		const res = await factory.app.get('/users').expect(200).expect('Content-Type', /json/);
		const users: IUser[] = res.body;

		cExpect(users).to.be.an('array');
		cExpect(users.length).eq(1);

		const [user] = users;
		cExpect(user).to.be.an('object');
		cExpect(user.id).eq(dummyUser.id);
		cExpect(user.email).eq(dummyUser.email);
		cExpect(user.username).eq(dummyUser.username);

		expect(mockReadAll).toHaveBeenCalledTimes(1);
	});

	test('GET /users/:id', async () => {
		const res = await factory.app.get(`/users/${dummyUser.id}`).expect(200).expect('Content-Type', /json/);
		const user: IUser = res.body;

		cExpect(user).to.be.an('object');
		cExpect(user.id).eq(dummyUser.id);
		cExpect(user.email).eq(dummyUser.email);
		cExpect(user.username).eq(dummyUser.username);

		expect(mockReadByID).toHaveBeenCalledTimes(1);
	});

	test('DELETE /users/:id', async () => {
		await factory.app.delete(`/users/${dummyUser.id}`).expect(204);
		expect(mockDelete).toHaveBeenCalledTimes(1);
		expect(mockReadByID).toHaveBeenCalledTimes(2);
	});

	test('DELETE /users/:id (404)', async () => {
		await factory.app.delete(`/users/${dummyUser.id}`).expect(404);
		expect(mockDelete).toHaveBeenCalledTimes(1);
		expect(mockReadByID).toHaveBeenCalledTimes(3);
	});
});
