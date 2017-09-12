import _ from 'lodash';
import {Collection} from '../../collection';

export class ArangoCollection extends Collection {
  constructor(db, name) {
    super(db, name);

    this.primaryKey = '_key';
  }

  findAll() {
    return this.db._connectionManager.get(async connection => {
      const data = await connection.query(`FOR doc IN ${this.name} RETURN doc`);
      return data._result;
    });
  }

  findById(id) {
    return this.db._connectionManager.get(connection => {
      const collection = connection._db.collection(this.name);
      return collection.document(String(id));
    });
  }
}
