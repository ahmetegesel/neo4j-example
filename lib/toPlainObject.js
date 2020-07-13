import {
  curry, pipe, prop, uncurryN,
} from 'ramda';
import toNeoObject from './toNeoObject';

const extractNode = uncurryN(2, (alias) => prop(alias));
const extractProperties = prop('properties');

const toPlainObject = curry(
  (nodeAlias, neoResultItem) => pipe(
    toNeoObject,
    extractNode(nodeAlias),
    extractProperties,
  )(neoResultItem),
);

export default toPlainObject;
