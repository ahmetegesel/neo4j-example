import { assoc, curry, pipe } from 'ramda';
import isNilOrEmpty from './isNilOrEmpty';
import toPlainObject from './toPlainObject';
import { renameProp } from './objectUtils';

export const mapRelation = curry(
  (maps, nodeAlias, resultItem, rootObj) => {
    const plainRelationItem = toPlainObject(nodeAlias, resultItem);
    const [propName, mapper, newPropName] = maps;
    const mappedRelationValue = mapper(plainRelationItem);

    if (isNilOrEmpty(newPropName)) {
      return assoc(propName, mappedRelationValue, rootObj);
    }

    return pipe(assoc(propName, mappedRelationValue), renameProp(propName, newPropName))(rootObj);
  },
);
