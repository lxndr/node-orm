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

function initialize(proto) {
  if (proto.orm) {
    return proto.orm;
  }

  proto.orm = {
    schema: null,
    fields: []
  };

  return proto.orm;
}

export function model(options = {}) {
  return function (Model) {
    const orm = initialize(Model.prototype);

    orm.schema = options.schema || _.snakeCase(Model.name);

    _.extend(Model, modelMethods);
    _.extend(Model.prototype, instanceMethods);
  };
}

export function field(options = {}) {
  return function (target, key) {
    const orm = initialize(target.prototype ? target.prototype : target);

    orm.fields.push({
      name: key,
      column: options.column || key,
      allowNull: options.allowNull || true
    });
  };
}
