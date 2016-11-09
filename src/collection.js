import _ from 'lodash';
import {EventEmitter} from 'events';
import {View} from './view';

export class Collection extends EventEmitter {
  /**
   * @method insert
   * @param doc
   * @async
   */

  /**
   * @method bulkInsert
   * @param docs
   * @async
   */

  /**
   * @param query
   * @async
   */
  async findOne(query) {
    return _.first(this.find(query));
  }

   /**
    * @param id
    * @async
    */
  findById(id) {
    return this.findOne({
      [this.primaryKey]: id
    });
  }

  /**
   * @method ensureIndex
   * @param options
   * @param options.fieldName
   * @param options.unique
   * @async
   */

  /**
   * @method removeIndex
   * @param field
   * @async
   */

  /**
   * @param filter
   */
  view(filter) {
    return new View(this, filter);
  }
}
