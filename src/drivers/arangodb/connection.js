import arangojs from 'arangojs';
import {Connection} from '../../connection';

export class ArangoConnection extends Connection {
  constructor(options) {
    super(options);
    this._db = new arangojs.Database(options);
  }

  async query(command) {
    return await this._db.query(command);
  }

  collections() {
    return this._db.listCollections();
  }

  collection(name) {
    return this._db.collection(name);
  }
}
