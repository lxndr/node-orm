import {Promise} from 'bluebird';
import {SqlConnection} from '../sql/connection';

export class MysqlConnection extends SqlConnection {
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
    super.query(sql);
    return Promise.fromCallback(cb => {
      console.log('SQL:', sql);
      this.db.query(sql, cb);
    });
  }

  close() {
    this.db.release();
    return Promise.resolve();
  }
}
