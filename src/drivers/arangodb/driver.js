import _ from 'lodash';
import arangojs from 'arangojs';
import {ArangoCollection} from './collection';

export class ArangoDriver {
  constructor(options = {}) {
    const conf = {
      databaseName: options.database
    };

    _.merge(conf, _.get(options, 'driverOptions.arangodb'));
    this._db = new arangojs.Database(conf);
  }

  collection(name) {
    return new ArangoCollection(this, name);
  }
}
