import {
  assoc, dissoc, identity, lens, over, pipe, prop,
} from 'ramda';

export const renameProp = (keyToBeRenamed, newKey) => pipe(
  over(lens(prop(keyToBeRenamed), assoc(newKey)), identity),
  dissoc(keyToBeRenamed),
);
