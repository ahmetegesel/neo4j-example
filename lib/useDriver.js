import { defaultTo } from 'ramda';
import Driver from 'neo4j-driver/lib/routing-driver';

import { isString } from './typeUtils';
import neo4j from 'neo4j-driver';

const useDriver = (options) => {
  const { url, authToken, config } = isString(options) ? { url: options } : defaultTo({}, options);

  return neo4j.driver(url, authToken, config);
}

const isDriver = (obj) => driver instanceof Driver;

export default useDriver;

export {
  isDriver
}
