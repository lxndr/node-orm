import _ from 'lodash';
import {Database} from '../../database';
import {ArangoConnection} from './connection';
import {ArangoCollection} from './collection';
import {ArangoStatement} from './statement';

export class ArangoDatabase extends Database {
  constructor(options) {
    super(options);

    this._arangoOptions = {
      databaseName: options.database
    };

    _.merge(this._arangoOptions, _.get(options, 'driverOptions.arangodb'));
  }

  createConnection() {
    return new this.Connection(this, this._arangoOptions);
  }
}

ArangoDatabase.prototype.Connection = ArangoConnection;
ArangoDatabase.prototype.Collection = ArangoCollection;
