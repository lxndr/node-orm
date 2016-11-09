import {NedbCollection} from './collection';

export class NedbDriver {
  constructor(options = {}) {
    if (!options.collections) {
      throw new Error('No collection info provided.');
    }

    this.collections = options.collections.map(collection => {
      return new NedbCollection(this, collection);
    });
  }

  collection(name) {
    return this.collections.find(collection => collection.name === name);
  }

  async close() {}
}
