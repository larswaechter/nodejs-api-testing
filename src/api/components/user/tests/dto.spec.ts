/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { expect } from 'chai';
import { Request } from 'express';
import { UserDTO } from '../dto';

describe('Document component (DTO)', () => {
	const user = new UserDTO('john@doe.com', 'johndoe');

	it('UserDTO.isValid()', () => {
		const doc = new UserDTO(user.email, user.username);
		expect(doc.isValid()).to.be.true;
	});

	it('UserDTO.isValid()', () => {
		const doc = new UserDTO('invalid-email', user.username);
		expect(doc.isValid()).to.be.false;
	});

	it('UserDTO.isValid()', () => {
		const doc = new UserDTO(user.email, '');
		expect(doc.isValid()).to.be.false;
	});

	it('UserDTO.fromRequest() #1', () => {
		const req = {
			body: user
		};

		const newUser = UserDTO.fromRequest(req as Request);
		expect(newUser).to.be.an('object');
		expect(newUser!.isValid()).to.be.true;
	});

	it('UserDTO.fromRequest() #2', () => {
		const req = {
			body: {}
		};

		const newUser = UserDTO.fromRequest(req as Request);
		expect(newUser).to.be.undefined;
	});
});
