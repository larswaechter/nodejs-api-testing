import { expect } from 'chai';

import { RepoTestFactory } from '../../../../test/repo.factory';
import { UserDTO } from '../dto';
import { UserRepository } from '../repository';

describe('User component (REPO)', () => {
	const factory: RepoTestFactory = new RepoTestFactory();
	let repo: UserRepository;

	const dummyUser = new UserDTO('john@doe.com', 'johndoe');

	beforeAll((done) => {
		factory.prepare((err?: Error) => {
			repo = new UserRepository(factory.dbClient);
			done(err);
		});
	});

	afterAll((done) => {
		factory.close(done);
	});

	it('readAll', () =>
		repo.readAll().then((users) => {
			expect(users).to.be.an('array');
			expect(users).lengthOf(0);
		}));

	it('readByID', () =>
		repo.readByID(1).then((users) => {
			expect(users).to.be.undefined;
		}));

	it('delete', () =>
		repo.delete(1).then((res) => {
			expect(res).to.be.false;
		}));

	it('create', () =>
		repo.create(dummyUser).then((user) => {
			expect(user).to.be.an('object');
			expect(user.id).eq(1);
			expect(user.email).eq(dummyUser.email);
			expect(user.username).eq(dummyUser.username);
		}));

	it('readAll', () =>
		repo.readAll().then((users) => {
			expect(users).to.be.an('array');
			expect(users).lengthOf(1);

			const user = users[0];
			expect(user).to.be.an('object');
			expect(user.id).eq(1);
			expect(user.email).eq(dummyUser.email);
			expect(user.username).eq(dummyUser.username);
		}));

	it('readByID', () =>
		repo.readByID(1).then((user) => {
			expect(user).to.be.an('object');
			expect(user.id).eq(1);
			expect(user.email).eq(dummyUser.email);
			expect(user.username).eq(dummyUser.username);
		}));

	it('delete', () =>
		repo.delete(1).then((res) => {
			expect(res).to.be.true;
		}));
});
