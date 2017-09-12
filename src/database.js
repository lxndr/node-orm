import URL from 'url';
import _ from 'lodash';
import {ConnectionManager} from './connection-manager';
export {model, field} from './model';

/**
 * Create new Database object.
 *
 * @param {String} url A URL like 'driver://username:password@hostname:port'.
 * @param {Object} options
 * @param {String} options.driver='memory'
 * @param {String} options.host
 * @param {Number} options.port
 * @param {String} options.username
 * @param {String} options.password
 * @param {String} options.database
 */
export class Database {
  constructor(url, options) {
    if (!new.target) {
      throw new Error('Database() must be called with new');
    }

    /* normalize options */
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
      const protocol = _.trimEnd(url.protocol, ':');

      _.defaults(options, {
        driver: protocol || 'memory',
        host: url.hostname,
        port: url.port,
        username: url.auth,
        database: url.pathname
      });
    }

    if (new.target === Database.prototype.constructor) {
      /* loading a driver module */
      const modulePath = `./drivers/${options.driver}`;

      try {
        const mod = require(modulePath);
        const DatabaseClass = mod.default || mod;
        return new DatabaseClass(options);
      } catch (err) {
        console.error(`Could not load driver module '${options.driver}' from '${modulePath}'`);
        throw err;
      }
    }

    /* init */
    this._connectionManager = new this.ConnectionManager(this);
  }

  /**
   * @return {Promise}
   */
  async close() {
    await this._connectionManager.close();
  }

  /**
   * @return {Connection}
   */
  async createConnection() {
  }

  /**
   *
   */
  async connection(cb) {
    return await cb();
  }

  /**
   *
   */
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

  /**
   * Database native query language if supported.
   *
   * @param {String} command
   * @return {any}
   */
  query(command) {
    if (!this.Connection.prototype.query) {
      throw new Error('This database does not support a quering language.');
    }

    return this._connectionManager.get(connection => {
      return connection.query(command);
    });
  }

  /**
   * Get lsit of all collections.
   * @return {Promise<Array<Collection>>}
   */
  collections() {
    if (!(this.Collection && this.Connection.prototype.collections)) {
      throw new Error('This database does not support collections.');
    }

    return this._connectionManager.get(connection => {
      return connection.collections();
    });
  }

  /**
   * @param {String} name of the collection
   * @return {Collection}
   */
  collection(name) {
    if (!this.Collection && this.Connection.prototype.collections) {
      throw new Error('This database does not support collections.');
    }

    return new this.Collection(this, name);
  }
}

Database.prototype.Connection = null;
Database.prototype.ConnectionManager = ConnectionManager;
Database.prototype.Collection = null;
Database.prototype.Statement = null;
Database.prototype.Transaction = null;
Database.prototype.View = null;
