import _ from 'lodash';
import {Promise} from 'bluebird';
import mysql from 'mysql2';
import MysqlConnection from './connection';

export default class MysqlDriver {
  constructor(options = {}) {
    const conf = {
      host: options.host,
      port: options.port,
      user: options.username,
      password: options.password,
      database: options.database
    };

    _.merge(conf, _.get(options, 'driverOptions.mysql'));
    this.pool = mysql.createPool(conf);
  }

  close() {
    return Promise.fromCallback(cb => {
      this.pool.end(cb);
    });
  }

  createConnection() {
    const connection = new MysqlConnection(this);
    return connection.open();
  }
}
