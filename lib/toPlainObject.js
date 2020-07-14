import {
  curry, pipe, prop, uncurryN,
} from 'ramda';
import toNeoObject from './toNeoObject';

const extractNode = uncurryN(2, (alias) => prop(alias));
const extractProperties = prop('properties');

/**
 * Accepts a `nodeAlias` to get properties of from given `neoResultItem` and converts it
 * to a plain javascript object which only consists of properties of the result.
 *
 * @function
 * @type {Function}
 * @param {string} nodeAlias
 * @param {object} neoResultItem
 * @return {object} Plain javascript object.
 * @example
 *
 * const result = await session.run(
 *  'MATCH (p:Person)-[r:DIRECTED]->(m:Movie) RETURN m,p LIMIT 2'
 * );
 * // result.records contains Array of objects something like this:
 * const neo4jRecord = {
 *   "keys": ["m", "p"],
 *   "length": 2,
 *   "_fields": [{
 *     "identity": { "low": 0, "high": 0 },
 *     "labels": ["Movie"],
 *     "properties": {
 *       "tagline": "Welcome to the Real World",
 *       "title": "The Matrix",
 *       "released": { "low": 1999, "high": 0 }
 *     }
 *   }, {
 *     "identity": { "low": 6, "high": 0 },
 *     "labels": ["Person"],
 *     "properties": { "name": "Lana Wachowski", "born": { "low": 1965, "high": 0 } }
 *   }],
 *   "_fieldLookup": { "m": 0, "p": 1 }
 * }
 *
 * toPlainObject(neo4jRecord);
 * // result
 * // { name: 'Lana Wachowski', born: { low: 1965, high: 0 } }
 *
 * */
const toPlainObject = curry(
  (nodeAlias, neoResultItem) => pipe(
    toNeoObject,
    extractNode(nodeAlias),
    extractProperties,
  )(neoResultItem),
);

export default toPlainObject;
