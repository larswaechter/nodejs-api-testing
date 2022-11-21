import { Request } from 'express';
import { UtilityService } from '../../../services/utility';

export interface IUser {
	id: number;
	email: string;
	username: string;
	created_at: Date;
}

export class UserDTO {
	email: string;
	username: string;

	constructor(email: string, username: string) {
		this.email = email;
		this.username = username;
	}

	static fromRequest(req: Request) {
		if (!UtilityService.hasProperties(req, ['email', 'username'])) return undefined;
		return new UserDTO(req.body.email, req.body.username);
	}

	isValid() {
		return UtilityService.isValidEmail(this.email) && this.username.length > 0;
	}
}
