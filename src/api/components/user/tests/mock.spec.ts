import { expect as cExpect } from 'chai';

import { MockTestFactory } from '../../../../factories/mock.factory';
import { IUser } from '../dto';

const dummyUser: IUser = {
	id: 1,
	email: 'john@doe.com',
	username: 'john',
	created_at: new Date()
};

const mockReadAll = jest.fn().mockResolvedValue([dummyUser]);
const mockReadByID = jest.fn().mockResolvedValue(dummyUser);
const mockDelete = jest.fn().mockResolvedValue(true);

jest.mock('../repository', () => ({
	UserRepository: jest.fn().mockImplementation(() => ({
		readAll: mockReadAll,
		readByID: mockReadByID,
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

	test('create, read & delete user', async () => {
		const getRes = await factory.app.get('/users').expect(200).expect('Content-Type', /json/);

		const getResUsers: IUser[] = getRes.body;
		cExpect(getResUsers).to.be.an('array');
		cExpect(getResUsers.length).eq(1);

		const getResUser = getResUsers[0];
		cExpect(getResUser).to.be.an('object');
		cExpect(getResUser.id).eq(dummyUser.id);
		cExpect(getResUser.email).eq(dummyUser.email);
		cExpect(getResUser.username).eq(dummyUser.username);

		expect(mockReadAll).toHaveBeenCalledTimes(1);

		const getRes2 = await factory.app.get('/users/1').expect(200).expect('Content-Type', /json/);

		const getResUser2: IUser = getRes2.body;
		cExpect(getResUser2).to.be.an('object');
		cExpect(getResUser2.id).eq(dummyUser.id);
		cExpect(getResUser2.email).eq(dummyUser.email);
		cExpect(getResUser2.username).eq(dummyUser.username);

		expect(mockReadByID).toHaveBeenCalledTimes(1);

		await factory.app.delete('/users/1').expect(204);

		expect(mockDelete).toHaveBeenCalledTimes(1);
	});
});
