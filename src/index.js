import URL from 'url';
import 'zone.js';
import _ from 'lodash';
import createDriver from './driver';
export {model, field} from './model';

export function query(...args) {
  const database = Zone.current.get('database');
  return database.query(...args);
}

export class Database {
  constructor(url, options) {
    if (_.isString(url)) {
      url = URL.parse(url);
    } else if (_.isObjectLike(url)) {
      options = url;
      url = null;
    } else {
      throw new Error();
    }

    if (!options) {
      options = {};
    }

    if (url) {
      let protocol = url.protocol;
      if (protocol.length > 0 && _.endsWith(protocol, ':')) {
        protocol = protocol.substring(0, protocol.length - 1);
      }

      _.defaults(options, {
        driver: protocol,
        host: url.hostname,
        port: url.port,
        username: url.auth,
        database: url.pathname
      });
    }

    this.driver = createDriver(options);
  }

  close() {
    return this.driver.close();
  }

  async transaction(cb) {
    const connection = await this.driver.createConnection();

    try {
      await connection.beginTransaction();

      try {
        const result = await Zone.current.fork({
          name: 'transaction',
          properties: {
            database: this,
            connection
          }
        }).run(cb);
        await connection.commit();
        return result;
      } catch (err) {
        await connection.rollback();
        throw err;
      }
    } finally {
      connection.close();
    }
  }

  async query(sql, params) {
    let connection = Zone.current.get('connection');
    if (connection) {
      return await connection.query(sql);
    }

    connection = await this.driver.createConnection();
    const result = await connection.query(sql);
    await connection.close();
    return result;
  }
}
