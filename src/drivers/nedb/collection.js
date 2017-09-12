import Datastore from 'nedb';
import {Collection} from '../../collection';
import {promiseFromCallback} from '../../util';

export class NedbCollection extends Collection {
  constructor(db, collectionInfo) {
    super(db, collectionInfo.name);
    this.primaryKey = '_id';

    this._store = new Datastore({
      filename: collectionInfo.path,
      autoload: true
    });
  }

  find(query = {}) {
    return promiseFromCallback(cb => {
      this._store.find(query).exec(cb);
    });
  }

  findOne(query) {
    return promiseFromCallback(cb => {
      this._store.findOne(query, cb);
    });
  }

  insert(doc) {
    if (Array.isArray(doc)) {
      throw new Error('NeDB does not support inserting an array as a single document. If you intend to insert more then one document, use bulkInsert method instead.');
    }

    return new Promise((resolve, reject) => {
      this._store.insert(doc, (err, newdoc) => {
        if (err) {
          reject(err);
          return;
        }

        this.emit('insert', newdoc);
        this.emit('change');
        resolve(newdoc);
      });
    });
  }

  bulkInsert(docs) {
    if (!Array.isArray(docs)) {
      throw new Error('Argument 1 has to be an array.');
    }

    return new Promise((resolve, reject) => {
      this._store.insert(docs, (err, newdocs) => {
        if (err) {
          reject(err);
          return;
        }

        newdocs.forEach(doc => this.emit('insert', doc));
        this.emit('change');
        resolve(newdocs);
      });
    });
  }

  update(query, doc) {
    this.emit('change');
  }

  async remove(query) {
    let removedDocs = [];

    if (this.listenerCount('remove') > 0) {
      removedDocs = await this.find(query);
    }

    const nRemoved = await promiseFromCallback(cb => {
      this._store.remove(query, {multi: true}, cb);
    });

    removedDocs.forEach(doc => this.emit('remove', doc));
    this.emit('change');

    return {nRemoved};
  }

  ensureIndex(options) {
    options = {
      fieldName: options.field,
      unique: options.unique
    };

    return promiseFromCallback(cb => {
      this._store.ensureIndex(options, cb);
    });
  }

  removeIndex(field) {
    return promiseFromCallback(cb => {
      this._store.removeIndex(field, cb);
    });
  }
}
