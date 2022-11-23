import { AbsTestFactory } from './abs.factory';

export class RepoTestFactory extends AbsTestFactory {
	prepareEach(cb: (err?: Error) => void) {
		this.connectPool(cb);
	}

	closeEach() {
		this.releasePoolClient();
	}

	closeAll(cb: (err?: Error) => void) {
		this.endPool(cb);
	}
}
