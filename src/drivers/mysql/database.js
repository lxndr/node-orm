import _ from 'lodash';
import mysql from 'mysql2';
import {Database} from '../../database';
import {MysqlConnection} from './connection';

export class MysqlDriver extends Database {
  constructor(options) {
    super(options);

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
