import _ from 'lodash';

export default function (options = {}) {
  _.defaults(options, {
    driver: 'mysql'
  });

  const modulePath = `./drivers/${options.driver}`;

  try {
    const DriverClass = require(modulePath).default;
    return new DriverClass(options);
  } catch (err) {
    console.error(err);
    console.error(`Could not load driver module '${options.driver}' from '${modulePath}'`);
    throw err;
  }
}
