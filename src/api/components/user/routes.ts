import { Router } from "express";
import { Client } from "pg";

import { UserController } from "./controller";

export class UserRoutes {
  private readonly controller: UserController;
  readonly router: Router = Router();

  constructor(client: Client) {
    this.controller = new UserController(client);
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router
      .route("/")
      .get(this.controller.readUsers)
      .post(this.controller.createUser);
    this.router
      .route("/:id")
      .get(this.controller.readUser)
      .delete(this.controller.deleteUser);
  }
}
