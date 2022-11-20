import { AbsTestFactory } from "./abs.factory";

export class RepoTestFactory extends AbsTestFactory {
  constructor() {
    super();
  }

  close(cb: (err?: Error) => void) {
    this.dbClient.end((err) => {
      if (err) return cb(err);
      cb();
    });
  }

  prepare(cb: (err?: Error) => void) {
    this.connectDatabase(cb);
  }
}
