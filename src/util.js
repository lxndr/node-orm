import _ from 'lodash';

export class WhereStatement {
  parse(stmt) {
    if (_.isPlainObject(stmt)) {
      stmt = _.map(stmt, (rhv, lhv) => {
        return {lhv, rhv, op: 'eq'};
      });
      stmt.op = 'and';
    }

    return stmt;
  }

  optimize() {
  }
}

/**
 * @param {Function} cb
 * @return {Promise}
 */
export function promiseFromCallback(cb) {
  return new Promise((resolve, reject) => {
    try {
      cb((err, value) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(value);
      });
    } catch (err) {
      reject(err);
    }
  });
}
