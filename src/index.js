import URL from 'url';
// import 'zone.js';
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

  async close() {
    if (this.driver.close) {
      await this.driver.close();
    }
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

  async query(cmd) {
    if (!this.driver.query) {
      throw new Error('Quering is not supported.');
    }

    let result;

    if (this.driver.createConnection) {
      const connection = await this.driver.createConnection();
      result = await connection.query(cmd);
      await connection.close();
    } else {
      result = await this.driver.query(cmd);
    }

    return result;
  }

  collection(name) {
    if (!this.driver.collection) {
      throw new Error('This database does not support collections.');
    }

    return this.driver.collection(name);
  }
}
