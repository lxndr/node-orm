import {Connection} from '../../connection';

export default class SqlConnection extends Connection {
  constructor(driver) {
    super();
    this.driver = driver;
  }

  query(sql) {
    console.log('SQL:', sql);
  }

  beginTransaction() {
    return this.query('BEGIN TRANSACTION');
  }

  commit() {
    return this.query('COMMIT');
  }

  rollback() {
    return this.query('ROLLBACK');
  }
}
