import { Client } from "pg";

import Logger from "../../../config/logger";
import { IUser, UserDTO } from "./dto";

export class UserRepository {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  readAll(): Promise<IUser[]> {
    return new Promise((resolve, reject) => {
      this.client.query<IUser>("SELECT * FROM users", (err, res) => {
        if (err) {
          Logger.error(err.message);
          reject("Failed to fetch users!");
        } else resolve(res.rows);
      });
    });
  }

  readByID(userID: number): Promise<IUser> {
    return new Promise((resolve, reject) => {
      this.client.query<IUser>(
        "SELECT * FROM users WHERE id = $1",
        [userID],
        (err, res) => {
          if (err) {
            Logger.error(err.message);
            reject("Failed to fetch users!");
          } else resolve(res.rowCount ? res.rows[0] : undefined);
        }
      );
    });
  }

  create(user: UserDTO): Promise<IUser> {
    if (!user.isValid()) throw new Error("Invalid user!");

    return new Promise((resolve, reject) => {
      this.client.query(
        "INSERT INTO users (email, username) VALUES($1, $2) RETURNING *",
        [user.email, user.username],
        (err, res) => {
          if (err) {
            Logger.error(err.message);
            reject("Failed to create user!");
          } else resolve(res.rowCount ? res.rows[0] : undefined);
        }
      );
    });
  }

  delete(userID: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.client.query<IUser>(
        "DELETE FROM users WHERE id = $1",
        [userID],
        (err, res) => {
          if (err) {
            Logger.error(err.message);
            reject("Failed to fetch users!");
          } else resolve(res.rowCount > 0);
        }
      );
    });
  }
}