import {
  equals, flip, pipe, type, uncurryN,
} from 'ramda';

export const isTypeOf = flip(uncurryN(2, pipe(type, equals)));
export const isObject = isTypeOf('Object');
