{
  name: 'string',

  size: 'tiny',

  attributes: [
    'not null'
  ],

  validate(value) {
    return false;
  },

  stringify(value) {
    return value;
  },

  parse(value) {
    return value;
  }
}
