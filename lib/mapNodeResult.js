import {
  always, identity, ifElse, isNil, map, pipe, tap,
} from 'ramda';
import jsonify from './jsonify';
import toPlainObject from './toPlainObject';

const processRelationMappers = (resultItem, relationMappers) => {
  if (isNil(relationMappers)) {
    return identity;
  }

  return pipe(
    ...map((relationMapper) => relationMapper(resultItem), relationMappers),
  );
};

// Type definition for RelationMapperFn
/**
 * It is a function which accepts each item from a Neo4j query result: "`resultItem`",
 * and the root object of the query result: "`rootObject`".
 *
 * `rootObject` is the object that will be the root of the result of exeuted query,
 * and RelationMapperFn functions parse related items in the result, so that it wil make
 * the related items ready to be placed in the root object.
 *
 * @typedef { function(resultItem: object, rootObject: object) } RelationMapperFn
 * */

/**
 * Maps Neo4j Query Result. If executed query is in following form
 * "`MATCH (n)-[r:DIRECTED]-(m) return n,m,r LIMIT 25`", then it parses returning result
 * in a way that it returns `jsonified` object. You can also pass `relationMappers` to
 * map `Relationship` or other related `Node` result.
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
const mapNodeResult = (nodeAlias, result, relationMappers) => map(
  (resultItem) => pipe(
    toPlainObject(nodeAlias),
    processRelationMappers(resultItem, relationMappers),
    jsonify,
  )(resultItem),
)(result);

export default mapNodeResult;
