import { expect } from "chai";

import { HttpTestFactory } from "../../../../test/http.factory";
import { IUser, UserDTO } from "../dto";
import { UserRepository } from "../repository";

describe("User component (HTTP)", () => {
  const factory: HttpTestFactory = new HttpTestFactory();
  let repo: UserRepository;

  const dummyUser = new UserDTO("john@doe.com", "johndoe");

  beforeAll((done) => {
    factory.prepare((err?: Error) => {
      repo = new UserRepository(factory.dbClient);
      done(err);
    });
  });

  afterAll((done) => {
    factory.close(done);
  });

  it("GET /users", (done) => {
    factory.app
      .get("/users")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        const users: IUser[] = res.body;

        expect(users).to.be.an("array");
        expect(users.length).eq(0);

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("GET /users/1", (done) => {
    factory.app
      .get("/users/1")
      .expect(404)
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("DELETE /users/1", (done) => {
    factory.app
      .delete("/users/1")
      .expect(404)
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("POST /users", (done) => {
    factory.app
      .post("/users")
      .send(dummyUser)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        const user: IUser = res.body;

        expect(user).to.be.an("object");
        expect(user.id).eq(1);
        expect(user.email).eq(dummyUser.email);
        expect(user.username).eq(dummyUser.username);

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("GET /users", (done) => {
    factory.app
      .get("/users")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        const users: IUser[] = res.body;

        expect(users).to.be.an("array");
        expect(users.length).eq(1);

        const user = users[0];
        expect(user).to.be.an("object");
        expect(user.id).eq(1);
        expect(user.email).eq(dummyUser.email);
        expect(user.username).eq(dummyUser.username);

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("GET /users/1", (done) => {
    factory.app
      .get("/users/1")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        const user: IUser = res.body;

        expect(user).to.be.an("object");
        expect(user.id).eq(1);
        expect(user.email).eq(dummyUser.email);
        expect(user.username).eq(dummyUser.username);

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("DELETE /users/1", (done) => {
    factory.app
      .delete("/users/1")
      .expect(204)
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});