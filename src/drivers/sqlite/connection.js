import {Promise} from 'bluebird';
import sqlite3 from 'sqlite3';
import SqlConnection from '../sql/connection';

export default class SqliteConnection extends SqlConnection {
  open() {
    return Promise.fromCallback(cb => {
      this.db = new sqlite3.Database(this.driver.path, cb);
    }).return(this);
  }

  query(sql) {
    super.query(sql);
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
