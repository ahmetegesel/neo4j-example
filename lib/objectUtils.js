import {
  assoc, dissoc, identity, lens, over, pipe, prop, uncurryN,
} from 'ramda';

/**
 * Renames a field in given object, which specified in the arguments.
 *
 * Note: Returning object is shallow cloned.
 *
 * @function
 * @type {Function}
 * @param {string} keyToBeRenamed Field name to be renamed in the given object.
 * @param {string} newKey New field name to rename given name as in the given object.
 * @param {object} obj Object to rename property of.
 * @return {obj} A shallow cloned object with renamed field.
 * @example
 *
 * renameProp('Name', 'name', { Name: 'Ahmet' });  // { name: 'Ahmet' }
 * renameProp('Name', 'name', { });                // { name: undefined }
 * */
export const renameProp = uncurryN(3, (keyToBeRenamed, newKey) => pipe(
  over(lens(prop(keyToBeRenamed), assoc(newKey)), identity),
  dissoc(keyToBeRenamed),
));
