/**
 * Connection manager.
 */
export class ConnectionManager {
  constructor(db) {
    this.db = db;
    this._defaultConnection = null;
  }

  /**
   *
   */
  get defaultConnection() {
    if (!this._defaultConnection) {
      this._defaultConnection = this.createConnection();
    }

    return this._defaultConnection;
  }

  async get(cb) {
    const connection = this.defaultConnection;
    return await cb(connection);
  }

  async close() {
    if (this._defaultConnection) {
      await this._defaultConnection.close();
    }
  }
}
