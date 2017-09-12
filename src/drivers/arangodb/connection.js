import arangojs from 'arangojs';
import {Connection} from '../../connection';

export class ArangoConnection extends Connection {
  constructor(db, options) {
    super(db, options);
    this._db = new arangojs.Database(options);
  }

  async query(command) {
    console.log(`AQL: ${command}`);
    return await this._db.query(command);
  }

  collections() {
    return this._db.listCollections();
  }

  collection(name) {
    return new this.db.Collection(this, name);
  }
}
