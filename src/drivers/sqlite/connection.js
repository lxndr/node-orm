import {Promise} from 'bluebird';
import sqlite3 from 'sqlite3';

export default class SqliteConnection {
  constructor(driver) {
    return Promise.fromCallback(cb => {
      this.db = new sqlite3.Database(driver.path, cb);
    });
  }

  query(sql) {
    return Promise.fromCallback(cb => {
      this.db.all(sql, cb);
    });
  }

  close() {
    return Promise.fromCallback(cb => {
      this.db.close(cb);
    });
  }
}
