import _ from 'lodash';
import {EventEmitter} from 'events';
import {View} from './view';

/**
 * @abstract
 */
export class Collection extends EventEmitter {
  /**
   * Insert a single document.
   * @param {Object} document
   * @return {Promise<Object>} a new docuemnt.
   */
  async insert() {
    return {};
  }

  /**
   * Insert a number of documents.
   * @param {Array<Object>} documents
   * @return {Promise<Array<Object>>} an array of new docuemnts.
   */
  async bulkInsert() {
    return [];
  }

  /**
   * @param {Object} [query]
   * @returns {Promise<Array<Object>>} an array of documents
   */
  async find() {
    return [];
  }

  /**
   * @param {Object} query
   * @return {?Promise<Object>} document.
   */
  async findOne(query) {
    return _.first(this.find(query));
  }

  /**
   * Gets a single document by its id.
   * @param {any} id
   * @return {?Promise<Object>}
   */
  findById(id) {
    return this.findOne({
      [this.primaryKey]: id
    });
  }

  /**
   * @param {Object} [options]
   * @param {string} options.fieldName
   * @param {boolean} options.unique
   */
  ensureIndex() {}

  /**
   * @param {string} field
   */
  removeIndex() {}

  /**
   * @param {Object} filter
   * @return {View}
   */
  view(filter) {
    return new View(this, filter);
  }
}
