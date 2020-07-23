import { curry, identity, map, pipe } from 'ramda';
import jsonify from '../jsonify';
import isNilOrEmpty from '../isNilOrEmpty';

const processRelationMappers = (resultItem, relationMappers) => {
  if (isNilOrEmpty(relationMappers)) {
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
 * Maps Neo4j Query Result, and returns `jsonified` object. Then it passes returning result
 * to the mappers given to the function for creating desired result from it.
 *
 * Accepts `rootMapper` as function to map given Neo4j Query Result Item.
 *
 * You can also pass `relationMappers` to this function for mapping
 * `Relationship` or other related `Node` result.
 *
 * Note: You can use {@link mapRelation} as function composer for `relationMappers`.
 *
 * @function
 * @type {Function}
 * @param {string} nodeAlias Alias name for the root object for the query result.
 * @param {function} rootMapper Mapper function to transform raw query result.
 * @param {Array<object>} result Array of records to be mapped from a query.
 * @param {Array<RelationMapperFn>} relationMappers Array of mappers for
 * relations (incl. related nodes) in the query result.
 * @return {object} Mapped object from a query result.
 * @example
 *
 * const result = await session.run(
 *  'MATCH (p:Person)-[r:DIRECTED]->(m:Movie) RETURN m,p LIMIT 2'
 * );
 *
 * // This will automatically maps the whole p:Person as root object,
 * // then maps m:Movie as movie field to the root object.
 * const result = mapNodeResult('p', toPlainObject, result.records, [
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
const mapResult = curry(
  (nodeAlias, rootMapper, result, relationMappers) => map(
    (resultItem) => pipe(
      rootMapper,
      processRelationMappers(resultItem, relationMappers),
      jsonify,
    )(resultItem),
  )(result),
);

export default mapResult;
