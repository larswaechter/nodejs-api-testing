/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { expect } from 'chai';
import { Request } from 'express';
import { UtilityService } from '../utility';

describe('Utility Service', () => {
	it('UtilityService.isValidEmail()', () => {
		expect(UtilityService.isValidEmail('invalid-email')).to.be.false;
	});

	it('UtilityService.isValidEmail()', () => {
		expect(UtilityService.isValidEmail('john@doe.com')).to.be.true;
	});

	it('UtilityService.hasProperties()', () => {
		expect(
			UtilityService.hasProperties(
				{
					body: {
						email: 'john@doe.com',
						username: 'johndoe'
					}
				} as Request,
				['email', 'username']
			)
		).to.be.true;
	});

	it('UtilityService.hasProperties()', () => {
		expect(
			UtilityService.hasProperties(
				{
					body: {
						email: 'john@doe.com'
					}
				} as Request,
				['email', 'username']
			)
		).to.be.false;
	});
});
