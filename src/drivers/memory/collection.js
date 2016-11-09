import {Collection} from '../collection';

export class MemoryCollection extends Collection {
  constructor(initEntities = []) {
    super();
    this.primaryKey = '_id';
    this.entities = initEntities;
  }

  find(options) {
    const l = [];

    if (options.where) {
      const where = new WhereStatement(options.where);
      // l = ;
    }

    if (options.limit) {
      l = _.take(l, options.limit);
    }

    return l;
  }
}
