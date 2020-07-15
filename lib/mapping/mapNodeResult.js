import { uncurryN, } from 'ramda';
import toPlainObject from '../toPlainObject';
import mapResult from './mapResult';

/**
 * Maps Neo4j Query Result. If executed query is in following form
 * "`MATCH (n)-[r:DIRECTED]-(m) return n,m,r LIMIT 25`", then it parses returning result
 * and returns `jsonified` object. You can also pass `relationMappers` to this function for mapping
 * `Relationship` or other related `Node` result.
 *
 * Note: You can use {@link mapRelation} as function composer for relation mappers.
 *
 * @function
 * @type {Function}
 * @param {string} nodeAlias Alias name for the root object for the query result.
 * @param {Array<object>} result Array of records to be mapped from a query.
 * @param {Array<RelationMapperFn>} relationMappers Array of mappers for relations (incl. related nodes) in the query result.
 * @return {object} Mapped object from a query result.
 * @example
 *
 * const result = await session.run(
 *  'MATCH (p:Person)-[r:DIRECTED]->(m:Movie) RETURN m,p LIMIT 2'
 * );
 *
 * // This will automatically maps the whole p:Person as root object,
 * // then maps m:Movie as movie field to the root object.
 * const result = mapNodeResult('p', result.records, [
 *   mapRelation(
 *     'm',
 *     [
 *       'movie',
 *       (item) => ({ tagline: item.tagline, title: item.title }),
 *     ],
 *   ),
 *  ]
 * );
 */
const mapNodeResult = uncurryN(3, (nodeAlias) => mapResult(nodeAlias, toPlainObject(nodeAlias)))

export default mapNodeResult;
