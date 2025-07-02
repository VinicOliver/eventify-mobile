import db from './SQLiteDatabase';
import { User } from '../types/user.type'

export class UserRepository {
  constructor() {
    this.up()
  }

  async up() {
    await db.runAsync(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL, organizer INTEGER NOT NULL);'
    );
  }

  async down() {
    await db.runAsync(
      'DROP TABLE users;'
    );
  }

  async save(user: User) {
    const result = await db.runAsync(
      "INSERT INTO users (name, email, password, organizer) VALUES (?, ?, ?, ?);",
      [user.name, user.email, user.password, user.organizer]
    );

    return result.lastInsertRowId;
  }

  async all() {
    const users = await db.getAllAsync<User>("SELECT * FROM users");
    return users;
  }
}
