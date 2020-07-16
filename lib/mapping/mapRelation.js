import { assoc, curry, defaultTo, map, nth, pipe } from 'ramda';
import toPlainObject from '../toPlainObject';
import { isArray, isString } from '../typeUtils';

/**
 * It is an array which consists of three elements:
 * [propName:string, mapperFn:Function, newPropName?:string].
 *
 * `propName` is the string value to be used as field name in the rootObject
 * when mapped value is placed in the root object.
 *
 * `mapperFn` is a {@link RelationMapperFn} that is responsible for mapping given
 * resultItem to be placed in rootObject.
 *
 * @typedef {Array} RelationMapArray
 * */

/**
 * Function composer for creating functions to mapping relations in a Neo4j Query Result.
 *
 * Note: for `maps` argument, you can also pass `string` to map given node to given
 * `propName` as it is in the original query result.
 *
 * @function
 * @type {Function}
 * @param {string} nodeAlias Alias name for the root object for the query result.
 * @param {Array<RelationMapArray> | string} maps to be checked if is of given type
 * @param {*} resultItem Source object to map from.
 * @param {Array<RelationMapperFn>} relationMappers Array of functions to map given
 * related Nodes in the query.
 * @return {boolean} `true` if it matches given type name, or else `false`.
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
 *
 * // This will automatically maps the whole p:Person as root object,
 * // then maps m:Movie as movie field to the root object as is
 * // in the query result.
 * const result = mapNodeResult('p', result.records, [
 *   mapRelation(
 *     'm',
 *     'movie',
 *   ),
 *  ]
 * );
 */
export const mapRelation = curry(
  (nodeAlias, maps, resultItem, rootObj) => {
    const plainRelationItem = toPlainObject(nodeAlias, resultItem);
    const propName = isString(maps) ? maps : nth(0, maps);
    const mapper = defaultTo((item) => item, isString(maps) ? undefined : nth(1, maps));

    const mappedRelationValue = isArray(plainRelationItem)
      ? map(mapper, plainRelationItem)
      : mapper(plainRelationItem);

    return assoc(propName, mappedRelationValue, rootObj);
  },
);
