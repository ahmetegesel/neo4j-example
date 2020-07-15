import {
  curry,
  equals, flip, pipe, type, uncurryN,
} from 'ramda';

/**
 * Checks if given `value`'s type matches given `typeName.
 *
 * Note: `typeName` should be PascalCase
 *
 * @function
 * @type {Function}
 * @param {string} typeName Name of the type to be checked
 * @param {*} value Value to be checkd if is of given type
 * @return {boolean} `true` if it matches given type name, or else `false`
 * @example
 *
 * isTypeOf('Object', {}); //=> true
 * isTypeOf('Number', 1); //=> true
 * isTypeOf('Boolean', false); //=> true
 * isTypeOf('String', 's'); //=> true
 * isTypeOf('Null', null); //=> true
 * isTypeOf('Array', []); //=> true
 * isTypeOf('RegExp', /[A-z]/); //=> true
 * isTypeOf('Function', () => {}); //=> true
 * isTypeOf('Undefined', undefined); //=> true
 *
 *
 * isTypeOf('Object', undefined); //=> false
 */
export const isTypeOf = flip(uncurryN(2, pipe(type, equals)));

/**
 * Checks if given `value` is `object`.
 *
 * It is recomposed version of `isTypeOf('Object', value);`. You can implement your own
 * by simply passing only the first parameter of `isTypeOf` fn. See: [Favoring Curry](https://fr.umio.us/favoring-curry/)
 *
 * @function
 * @type {Function}
 * @param {*} Value to be checked if is of given type
 * @return {boolean} `true` if it matches given type name, or else `false`
 * @example
 *
 * isObject({}); //=> true
 * isObject(undefined); //=> false
 * isObject(false); //=> false
 */
export const isObject = isTypeOf('Object');

/**
 * Checks if given `value` is `Array`.
 *
 * It is recomposed version of `isTypeOf('Array', value);`. You can implement your own
 * by simply passing only the first parameter of `isTypeOf` fn. See: [Favoring Curry](https://fr.umio.us/favoring-curry/)
 *
 * @function
 * @type {Function}
 * @param {*} Value to be checked if is of given type
 * @return {boolean} `true` if it matches given type name, or else `false`
 * @example
 *
 * isArray([1, 2]); //=> true
 * isArray(['Foo', 'Bar']); //=> true
 * isArray({}); //=> false
 * isArray(undefined); //=> false
 */
export const isArray = isTypeOf('Array');
