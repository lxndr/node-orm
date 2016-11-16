import _ from 'lodash';
import {Collection} from '../../collection';
import {ArangoStatement} from './statement';

export class ArangoCollection extends Collection {
  constructor(db, name) {
    super(db, name);

    this.db = db;
    this.name = name;
    this._collection = this.db._db.collection(name);

    this.primaryKey = '_key';
  }

  async find(query) {
    const stmt = new ArangoStatement(query);
    const filter = ' FILTER ' + stmt.toFilter();
    return await this.query(`FOR doc IN ${this.name}${filter} RETURN doc`);
  }

  findById(id) {
    return this._collection.document(id);
  }
}
