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
	beforeAll((done) => {
		factory.prepare(done);
	});

	// Stop Express Server
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

				cExpect(users).to.be.an('array');
				cExpect(users.length).eq(1);

				const user = users[0];
				cExpect(user).to.be.an('object');
				cExpect(user.id).eq(dummyUser.id);
				cExpect(user.email).eq(dummyUser.email);
				cExpect(user.username).eq(dummyUser.username);

				expect(mockReadAll).toHaveBeenCalledTimes(1);

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

				cExpect(user).to.be.an('object');
				cExpect(user.id).eq(dummyUser.id);
				cExpect(user.email).eq(dummyUser.email);
				cExpect(user.username).eq(dummyUser.username);

				expect(mockReadByID).toHaveBeenCalledTimes(1);

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
				expect(mockDelete).toHaveBeenCalledTimes(1);

				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});
