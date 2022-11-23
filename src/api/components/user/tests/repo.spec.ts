import { expect } from 'chai';

import { RepoTestFactory } from '../../../../factories/repo.factory';
import { UserRepository } from '../repository';
import { UserDTO } from '../dto';

describe('User component (REPO)', () => {
	const factory: RepoTestFactory = new RepoTestFactory();
	const dummyUser = new UserDTO('john@doe.com', 'johndoe');

	// Connect to pool
	beforeEach((done) => {
		factory.prepareEach(done);
	});

	// Release pool client
	afterEach(() => {
		factory.closeEach();
	});

	// End pool
	afterAll((done) => {
		factory.closeAll(done);
	});

	test('read empty users', () => {
		const repo = new UserRepository();
		repo.readAll().then((users) => {
			expect(users).to.be.an('array');
			expect(users).lengthOf(0);
		});
	});

	test('read empty user', () => {
		const repo = new UserRepository();
		repo.readByID(1).then((users) => {
			expect(users).to.be.undefined;
		});
	});

	test('delete non existing user', () => {
		const repo = new UserRepository();
		repo.delete(1).then((res) => {
			expect(res).to.be.false;
		});
	});

	test('create, read & delete user', async () => {
		const repo = new UserRepository();

		// create
		const createRes = await repo.create(dummyUser);

		expect(createRes).to.be.an('object');
		expect(createRes.id).eq(1);
		expect(createRes.email).eq(dummyUser.email);
		expect(createRes.username).eq(dummyUser.username);

		// readAll
		const readAllRes = await repo.readAll();
		expect(readAllRes).to.be.an('array');
		expect(readAllRes).lengthOf(1);
		expect(readAllRes[0]).to.be.an('object');
		expect(readAllRes[0].id).eq(1);
		expect(readAllRes[0].email).eq(dummyUser.email);
		expect(readAllRes[0].username).eq(dummyUser.username);

		// readByID
		const readByIDRes = await repo.readByID(1);
		expect(readByIDRes).to.be.an('object');
		expect(readByIDRes.id).eq(1);
		expect(readByIDRes.email).eq(dummyUser.email);
		expect(readByIDRes.username).eq(dummyUser.username);

		// readByEmailOrUsername
		const readByEmailOrUsernameRes1 = await repo.readByEmailOrUsername('john@doe.com', '');
		expect(readByEmailOrUsernameRes1).to.be.an('object');
		expect(readByEmailOrUsernameRes1.id).eq(1);
		expect(readByEmailOrUsernameRes1.email).eq(dummyUser.email);
		expect(readByEmailOrUsernameRes1.username).eq(dummyUser.username);

		const readByEmailOrUsernameRes2 = await repo.readByEmailOrUsername('', 'johndoe');
		expect(readByEmailOrUsernameRes2).to.be.an('object');
		expect(readByEmailOrUsernameRes2.id).eq(1);
		expect(readByEmailOrUsernameRes2.email).eq(dummyUser.email);
		expect(readByEmailOrUsernameRes2.username).eq(dummyUser.username);

		// delete
		const deleteRes = await repo.delete(1);
		expect(deleteRes).to.be.true;

		// readByID
		const readByIDRes2 = await repo.readByID(1);
		expect(readByIDRes2).to.be.undefined;
	});
});
