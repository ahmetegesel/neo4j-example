import {
  always, identity, ifElse, isNil, map, pipe,
} from 'ramda';
import jsonify from './jsonify';
import toPlainObject from './toPlainObject';

const processRelationMappers = (resultItem, relationMappers) => ifElse(
  isNil,
  always(identity),
  always(pipe(
    ...map((relationMapper) => relationMapper(resultItem), relationMappers),
  )),
)(relationMappers);

const mapNodeResult = (nodeAlias, result, relationMappers) => map(
  (resultItem) => pipe(
    toPlainObject(nodeAlias),
    processRelationMappers(resultItem, relationMappers),
    jsonify,
  )(resultItem),
)(result);

export default mapNodeResult;
