import {
  always,
  both,
  concat,
  cond,
  converge,
  curry,
  dropLast,
  endsWith,
  equals,
  head,
  identity,
  inc,
  length,
  pipe,
  T,
  tail,
  takeLast,
  toLower,
} from 'ramda';

const isLastNthCharLower = curry((n, char) => {
  const lastNthChar = head(takeLast(inc(n), char));
  return lastNthChar === toLower(lastNthChar);
});

/**
 * Converts given string to camelCase.
 *
 * @function
 * @type {Function}
 * @param {string} str String value to turn into camelCase
 * @return {string} camelCase string value.
 * @example
 *
 * const neo4j = require('neo4j-driver');
 *
 * const neoInt = neo4j.types.Integer.fromNumber(20);
 *
 * console.log(isNeoInt(neoInt)); // true
 * console.log(isNeoInt(20)); // false
 * */
const toCamelCase = pipe(
  // first handle special conditions
  cond(
    [
      [equals('ID'), always('id')],
      // if endsWith ID and ID is a word not the last part of another word
      // e.g. ApiID -> ApiId but COVID -> COVID it should remain
      [both(endsWith('ID'), isLastNthCharLower(inc(length('ID')))), converge(concat, [dropLast(length('ID')), always('Id')])],
      [T, identity],
    ],
  ),
  // then actual camel case operation
  converge(
    concat,
    [pipe(head, toLower), tail],
  ),
);

export default toCamelCase;
