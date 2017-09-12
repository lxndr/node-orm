/**
 * Expression: {fn: ..., args: [...]}
 */
export class Statement {
  constructor(expr) {
    // this.ret = this._parse('$and', expr);
    this.optimize();
  }

  optimize() {
  }

  isFunction(name) {
    return typeof name === 'string' && name[0] === '$';
  }

  _parse(fn, expr) {
    return {
      fn,
      args: this[fn](expr)
    }
  }

  /**
   * {
   *   a: 1,
   *   b: {
   *
   *   }
   * }
   */
  $and(expr) {
    const args = [];

    _.each(expr, (val, key) => {
      if (!this.isFunction(key)) {
        if (_.isObjectLike(val)) {

        } else {
          key = '$eq';
        }
      }

      args.push(this._parse(key, val));
    });
  }
}
