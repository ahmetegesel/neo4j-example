import {
  cond, identity, invoker, keys, reduce, T,
} from 'ramda';

import { isObject } from './typeUtils';
import isNeoInt from './isNeoInt';
import toCamelCase from './toCamelCase';

/**
 * It is util function which is made for specifically Neo4j usages. It provides json object
 * result converting anything that is against json conventions, (e.g. json field names
 * should be in camelCase). It is mostly useful for REST APIs.
 *
 * It also converts Neo4j Integers to string. Neo4j Integers provide bigger numbers than
 * limit of Javascript numbers. Instead of destroying them, it returns them as strings.
 *
 * @function
 * @type {Function}
 * @param {object} obj Object to be jsonified.
 * @return {object} jsonified object.
 * @example
 *
 * const neo4j = require('neo4j-driver');
 *
 * const neoInt = neo4j.types.Integer.fromNumber(20);
 *
 * const objectToJsonify = {
 *   Name: 'Some Name',
 *   Score: neoInt,
 *   SubField: {
 *     SubName: 'Sub Name'
 *   }
 * }
 *
 * console.log(jsonify(objectToJsonify)):
 *
 * // result
 * // {
 * //   name: 'Some Name',
 * //   score: '20',
 * //   subField: {
 * //     subName: 'Sub Name'
 * //   }
 * // }
 * */
const jsonify = (obj) => reduce((acc, key) => {
  const parsedValue = cond([
    [isNeoInt, invoker(0, 'toString')],
    [isArray, map(jsonify)],
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
