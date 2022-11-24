import { expect } from 'chai';

import { userDTOFactory, userFactory } from '../../../../factories/helper';
import { RepoTestFactory } from '../../../../factories/repo.factory';
import { IUser, UserDTO } from '../dto';
import { UserRepository } from '../repository';

describe('User component (REPO)', () => {
	const factory: RepoTestFactory = new RepoTestFactory();
	const dummyUser: IUser = userFactory.build();
	const dummyUserDTO: UserDTO = userDTOFactory.build();

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

	test('read empty user by id', () => {
		const repo = new UserRepository();
		repo.readByID(1).then((users) => {
			expect(users).to.be.undefined;
		});
	});

	test('read empty user by email', () => {
		const repo = new UserRepository();
		repo.readByEmailOrUsername(dummyUser.email, '').then((users) => {
			expect(users).to.be.undefined;
		});
	});

	test('read empty user by username', () => {
		const repo = new UserRepository();
		repo.readByEmailOrUsername('', dummyUser.username).then((users) => {
			expect(users).to.be.undefined;
		});
	});

	test('delete empty user', () => {
		const repo = new UserRepository();
		repo.delete(1).then((res) => {
			expect(res).to.be.false;
		});
	});

	test('create new user', async () => {
		const repo = new UserRepository();
		const user = await repo.create(dummyUserDTO);

		expect(user).to.be.an('object');
		expect(user.id).eq(1);
		expect(user.email).eq(dummyUser.email);
		expect(user.username).eq(dummyUser.username);

		const count = await factory.getTableRowCount('users');
		expect(count).eq(1);
	});

	test('read all users', async () => {
		const newUser = await userFactory.create();
		const repo = new UserRepository();

		const users = await repo.readAll();
		expect(users).to.be.an('array');
		expect(users).lengthOf(1);

		const [user] = users;
		expect(user).to.be.an('object');
		expect(user.id).eq(newUser.id);
		expect(user.email).eq(newUser.email);
		expect(user.username).eq(newUser.username);
	});

	test('read user by id', async () => {
		const newUser = await userFactory.create();
		const repo = new UserRepository();

		const user = await repo.readByID(1);
		expect(user).to.be.an('object');
		expect(user.id).eq(newUser.id);
		expect(user.email).eq(newUser.email);
		expect(user.username).eq(newUser.username);
	});

	test('read user by email', async () => {
		const newUser = await userFactory.create();
		const repo = new UserRepository();

		const user = await repo.readByEmailOrUsername(newUser.email, '');
		expect(user).to.be.an('object');
		expect(user.id).eq(newUser.id);
		expect(user.email).eq(newUser.email);
		expect(user.username).eq(newUser.username);
	});

	test('read user by username', async () => {
		const newUser = await userFactory.create();
		const repo = new UserRepository();

		const user = await repo.readByEmailOrUsername('', newUser.username);
		expect(user).to.be.an('object');
		expect(user.id).eq(1);
		expect(user.email).eq(newUser.email);
		expect(user.username).eq(newUser.username);
	});

	test('delete user', async () => {
		const newUser = await userFactory.create();

		const repo = new UserRepository();
		const deleted = await repo.delete(newUser.id);

		expect(deleted).to.be.true;

		const count = await factory.getTableRowCount('users');
		expect(count).eq(0);
	});
});
