import { curry, reduce } from 'ramda';

import { assocPathBy } from '../objectUtils';

/**
 * Maps given fields to given object by passing it to given mapper function.
 *
 * It simply picks given fields from given object, then process them by passing
 * the object to given mapper function, and finally returns the object with
 * modified fields.
 *
 * Note: `fields` param supports path formatted fields (e.g. foo.bar)
 * Note: 'fields' param also supports nested objects wrapped in array
 *
 * @function
 * @type {Function}
 * @param {Array<string>} fields Fields to be mapped
 * @param {function(object) : object} mapper Function to process given fields
 * @param {object} obj Object to modify the fields of
 * @return {object} Mapped object
 * @example
 *
 * const data = {
 *   num: 1,
 *   nested: {
 *     num: 1
 *   },
 *   array: [
 *     { num: 1 }
 *   ]
 * }
 * mapFields(['num', 'nested.num', 'array.num'], (val) => val.toString(), data);
 * // result
 * // { num: '1', nested: { num: '1' }, array: [ { num: '1' } ] }
 */
const mapFields = curry(
  (fields, mapper, obj) => reduce(
    (acc, next) => assocPathBy(next.split('.'), mapper, acc), obj, fields,
  ),
);

export default mapFields;
