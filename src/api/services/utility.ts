import { Request } from 'express';

export class UtilityService {
	static hasProperties(req: Request, properties: string[]) {
		for (const prop of properties)
			if (!(prop in req.body) || req.body[prop] === undefined || req.body[prop] === null) return false;
		return true;
	}

	static isValidEmail(email: string) {
		return new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/).test(email.toLowerCase());
	}
}
