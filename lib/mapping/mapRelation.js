import { assoc, curry, map, pipe } from 'ramda';
import isNilOrEmpty from '../isNilOrEmpty';
import toPlainObject from '../toPlainObject';
import { renameProp } from '../objectUtils';
import { isArray } from '../typeUtils';

/**
 * It is an array which consists of three elements: [propName:string, mapperFn:Function, newPropName?:string].
 *`propName` is the string value to be used as field name in the rootObject when mapped value is placed
 * in the root object.
 * `mapperFn` is a {@link RelationMapperFn} that is responsible for mapping given resultItem to be placed in rootObject
 * `newPropName` is an optional string value to be used when there is already a field to be placed mapped value in
 * the rootObject yet we want to rename that field before it is placed.
 * It is an array which consists of three elements:
 * [propName:string, mapperFn:Function, newPropName?:string].
 *
 * `propName` is the string value to be used as field name in the rootObject
 * when mapped value is placed in the root object.
 *
 * `mapperFn` is a {@link RelationMapperFn} that is responsible for mapping given
 * resultItem to be placed in rootObject.
 *
 * `newPropName` is an optional string value to be used when there is already a field
 * to be placed mapped value in the rootObject yet we want to rename that field before
 * it is placed.
 *
 * @typedef {Array} RelationMapArray
 * */

/**
 * Function composer for creating functions to map relations in a Neo4j Query Result.
 * Function composer for creating functions to mapping relations in a Neo4j Query Result.
 *
 * @function
 * @type {Function}
 * @param {string} nodeAlias Alias name for the root object for the query result.
 * @param {Array<RelationMapArray>} result to be checked if is of given type
 * @param {Array<RelationMapperFn>} relationMappers to be checked if is of given type
 * @return {boolean} `true` if it matches given type name, or else `false`
 * @param {Array<RelationMapArray>} maps to be checked if is of given type
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
 */
export const mapRelation = curry(
  (nodeAlias, maps, resultItem, rootObj) => {
    const plainRelationItem = toPlainObject(nodeAlias, resultItem);
    const [propName, mapper, newPropName] = maps;
    const mappedRelationValue = isArray(plainRelationItem) ? map(mapper, plainRelationItem) : mapper(plainRelationItem);

    if (isNilOrEmpty(newPropName)) {
      return assoc(propName, mappedRelationValue, rootObj);
    }

    return pipe(assoc(propName, mappedRelationValue), renameProp(propName, newPropName))(rootObj);
  },
);
