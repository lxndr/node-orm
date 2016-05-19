import {Promise} from 'bluebird';

export default class MysqlConnection {
  constructor(driver) {
    this.driver = driver;
  }

  open() {
    return new Promise((resolve, reject) => {
      this.driver.pool.getConnection((err, db) => {
        if (err) {
          reject(err);
          return;
        }

        this.db = db;
        resolve(this);
      });
    });
  }

  query(sql) {
    return Promise.fromCallback(cb => {
      console.log('SQL:', sql);
      this.db.query(sql, cb);
    });
  }

  close() {
    this.db.release();
    return Promise.resolve();
  }

  beginTransaction() {
    return this.query('START TRANSACTION');
  }

  commit() {
    return this.query('COMMIT');
  }

  rollback() {
    return this.query('ROLLBACK');
  }
}
