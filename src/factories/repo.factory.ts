import { AbsTestFactory } from './abs.factory';

export class RepoTestFactory extends AbsTestFactory {
	close(cb: (err?: Error) => void) {
		this.disconnectDB(cb);
	}

	prepare(cb: (err?: Error) => void) {
		this.connectDB(cb);
	}
}
