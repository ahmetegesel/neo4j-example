import {
  cond, identity, invoker, keys, reduce, T,
} from 'ramda';
import { isObject } from './typeUtils';
import isNeoInt from './isNeoInt';
import toCamelCase from './toCamelCase';

const jsonify = (obj) => reduce((acc, key) => {
  const parsedValue = cond([
    [isNeoInt, invoker(0, 'toString')],
    [isObject, jsonify],
    // else/default condition, return as is
    [T, identity],
  ])(obj[key]);
  const parsedKey = toCamelCase(key);

  return {
    ...acc,
    [parsedKey]: parsedValue,
  };
}, {}, keys(obj));

export default jsonify;
