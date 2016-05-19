import _ from 'lodash';

export default function (options = {}) {
  _.defaults(options, {
    driver: 'mysql'
  });

  const DriverClass = require(`./drivers/${options.driver}`).default;
  return new DriverClass(options);
}
