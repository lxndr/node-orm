import {Collection} from '../collection';

export class ArangoCollection extends Collection {
  constructor(db, name) {
    super(db, name);

    this.db = db;
    this.name = name;
    this._collection = this.db._db.collection(name);
  }

  findById(id) {
    return this._collection.document(id);
  }
}
