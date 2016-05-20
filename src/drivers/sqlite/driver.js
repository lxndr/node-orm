import SqliteConnection from './connection';

export default class SqliteDriver {
  constructor(options = {}) {
    this.path = options.path || ':memory:';
  }

  createConnection() {
    const connection = new SqliteConnection(this);
    return connection.open();
  }
}
