import {Database} from '../../database';
import {SqliteConnection} from './connection';

export class SqliteDatabase extends Database {
  constructor(options) {
    super();
    this.path = options.path || ':memory:';
  }

  createConnection() {
    const connection = new SqliteConnection(this);
    return connection.open();
  }
}
