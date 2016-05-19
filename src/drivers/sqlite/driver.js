import SqliteConnection from './connection';

export default class SqliteDriver {
  constructor(options = {}) {
    this.path = options.path;
  }

  createConnection() {
    return new SqliteConnection(this);
  }
}
