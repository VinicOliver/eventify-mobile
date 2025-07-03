import db from './SQLiteDatabase';
import { Event } from '../types/event.type';

export class EventRepository {
  constructor() {
    this.up();
  }

  async up() {
    await db.runAsync(
      'CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY NOT NULL, title TEXT, localization TEXT, date TEXT, image TEXT, description TEXT);'
    );
  }

  async down() {
    await db.runAsync(
      'DROP TABLE events;'
    );
  }

  async save(event: Event) {
    try {
    const result = await db.runAsync(
      'INSERT INTO events (title, localization, date, image, description) VALUES (?, ?, ?, ?, ?);',
      [event.title ?? '', event.localization ?? '', event.date ?? '', event.image ?? '', event.description ?? '']
    );

    return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getAll() {
    const result = await db.getAllAsync<Event>('SELECT * FROM events;');

    return result;
  }

  async getById(id: number) {
    const result = await db.getFirstAsync<Event>('SELECT * FROM events WHERE id = ?;', [id]);
    return result;
  }

  async update(id: number, event: Event) {
    const result = await db.runAsync(
      'UPDATE events SET title = ?, localization = ?, date = ?, image = ?, description = ? WHERE id = ?;',
      [event.title ?? '', event.localization ?? '', event.date ?? '', event.image ?? '', event.description ?? '', id]
    );
    return result;
  }
}
