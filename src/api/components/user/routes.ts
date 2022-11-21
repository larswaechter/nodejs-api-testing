import { Router } from 'express';

import { UserController } from './controller';

export class UserRoutes {
	private readonly controller: UserController;
	readonly router: Router = Router();

	constructor() {
		this.controller = new UserController();
		this.initRoutes();
	}

	private initRoutes(): void {
		this.router.route('/').get(this.controller.readUsers).post(this.controller.createUser);
		this.router.route('/:id').get(this.controller.readUser).delete(this.controller.deleteUser);
	}
}
