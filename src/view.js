export class View {
  construction(collection, filter) {
    this.collection = collection;
    this.filter = filter;
  }

  async find() {
    return this.collection.find(this.filter);
  }
}
