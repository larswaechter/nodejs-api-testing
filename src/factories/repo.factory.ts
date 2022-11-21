import { AbsTestFactory } from './abs.factory';

export class RepoTestFactory extends AbsTestFactory {
	constructor() {
		super();
	}

	close(cb: (err?: Error) => void) {
		this.disconnectDB(cb);
	}

	prepare(cb: (err?: Error) => void) {
		this.connectDB(cb);
	}
}
