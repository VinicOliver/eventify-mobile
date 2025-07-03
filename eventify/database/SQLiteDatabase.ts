import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('eventify_db');

export default db;