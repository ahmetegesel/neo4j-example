import { either, isEmpty, isNil } from 'ramda';

/**
 * Checks given object and returns `true` when given object is `null`, `undefined', `[]`, `{}`, `''`,
 * or else it returns `false`.
 *
 * @function
 * @type {Function}
 * @param {*} obj Object to be checked if it is nil or empty.
 * @return {boolean} `true` when it's a nil or empty, or `false`.
 * @example
 *
 * isNilOrEmpty(null);            //=> true
 * isNilOrEmpty(undefined);       //=> true
 * isNilOrEmpty(0);               //=> false
 * isNilOrEmpty([1, 2, 3]);       //=> false
 * isNilOrEmpty([]);              //=> true
 * isNilOrEmpty('');              //=> true
 * isNilOrEmpty({});              //=> true
 * isNilOrEmpty({length: 0});     //=> false
 *
 */
const isNilOrEmpty = either(isNil, isEmpty);

export default isNilOrEmpty;
