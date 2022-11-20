import { Client } from "pg";
import express, { json, Request, Response, NextFunction } from "express";

import Logger from "../config/logger";
import { UserRoutes } from "./components/user/routes";

export class Server {
  private readonly _app: express.Application = express();
  client: Client;

  constructor(client: Client) {
    this.client = client;
    this.registerMiddleware();
    this.registerRoutes();
    this.registerErrorHandler();
  }

  get app(): express.Application {
    return this._app;
  }

  private registerMiddleware() {
    this._app.use(json());
  }

  private registerRoutes() {
    this._app.use("/users", new UserRoutes(this.client).router);
  }

  private registerErrorHandler() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this._app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        Logger.error(err);
        return res.status(500).json(err.message || err);
      }
    );
  }
}
