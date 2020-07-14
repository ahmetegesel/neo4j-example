import {
  always, identity, ifElse, isNil, map, pipe,
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

const mapNodeResult = (nodeAlias, result, relationMappers) => map(
  (resultItem) => pipe(
    toPlainObject(nodeAlias),
    processRelationMappers(resultItem, relationMappers),
    jsonify,
  )(resultItem),
)(result);

export default mapNodeResult;
