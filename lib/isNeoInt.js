import neo4j from 'neo4j-driver';

/**
 * Checks given object and returns `true` when given object is a of neo4j Integer Type,
 * or else it returns false.
 *
 * For more information about Neo4j Integer Type see:
 * [Numbers and the Integer type](https://github.com/neo4j/neo4j-javascript-driver#numbers-and-the-integer-type).
 *
 * @function
 * @type {Function}
 * @param {*} obj Object to be checked if it is of neo4j Integer Type.
 * @return {boolean} `true` when it's a Neo4j Int, or `false`.
 * @example
 *
 * const neo4j = require('neo4j-driver');
 *
 * const neoInt = neo4j.types.Integer.fromNumber(20);
 *
 * console.log(isNeoInt(neoInt)); // true
 * console.log(isNeoInt(20)); // false
 * */
const isNeoInt = neo4j.types.Integer.isInteger;

export default isNeoInt;
