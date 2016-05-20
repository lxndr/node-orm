import _ from 'lodash';

export const modelMethods = {
  primaryKey() {
    const orm = Reflect.getPrototypeOf(this).orm;
    return _.find(orm.fields, {primaryKey: true});
  },

  async findById(id) {
    const primaryKey = this.primaryKey();

    const where = {
      where: {
        [primaryKey]: id
      }
    };

    const entities = await this.find(where);
    return _.first(entities);
  },

  async find(options = {}) {
    const orm = this.prototype.orm;

    /* connection */
    const connection = options.connection ||
      Zone.current.get('connection');

    /* query */
    const rows = await connection.query(`SELECT * FROM ${orm.schema}`);

    /* make instances */
    return rows.map(row => {
      const entity = new this();

      _.each(row, (value, column) => {
        const field = _.find(orm.fields, {column});
        if (!field) {
          return;
        }

        entity[field.name] = value;
      });

      return entity;
    });
  }
};

export const instanceMethods = {
  changed() {
    const orm = Reflect.getPrototypeOf(this).orm;
    const list = [];

    _.each(orm.fields, field => {
      list.push(field.name);
    });

    return list;
  },

  async persist() {
    const orm = Reflect.getPrototypeOf(this).orm;
    const changed = this.changed();
    // orm.query();
    console.log('saving');
    return null;
  }
};
