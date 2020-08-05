import {
  assoc, dissoc, identity, lens, over, pipe, prop, 
  uncurryN, curryN, has, is, map, isNil,
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

/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, and placing the specific value at the tail end of that path
 * by given mapper function.
 *
 * Note that this copies and flattens prototype properties onto the new object as well.
 * All non-primitive properties are copied by reference.
 *
 * @function
 * @type {Function}
 * @param {Array<string>} path The path to set
 * @param {Function<T>} mapper Mapper fn to process new value
 * @param {Array | Object} obj The object to clone
 * @return {Array | Object} A new object equivalent to the original except for the changed property.
 * @example
 * const data = { a: {b: 1}};
 * assocPathBy(['a', 'b'], item => item + 1, data); // {"a": {"b": 2}};
 *
 * const dataWithArray = { a: [{b: 1}, {b: 2}]};
 * assocPathBy(['a', 'b'], item => item + 1, dataWithArray); // {"a": [{"b": 2}, {"b": 3}]}
 * */
export const assocPathBy = curryN(3, (path, mapper, obj) => {
  if (path.length === 0) {
    return obj;
  }

  const idx = path[0];
  let val;

  if (path.length > 1) {
    // eslint-disable-next-line no-nested-ternary
    const nextObj = !isNil(obj) ? (is(Array)(obj) ? [] : has(idx, obj) ? obj[idx] : {}) : {};

    const assocPathByMapper = assocPathBy(Array.prototype.slice.call(path, 1), mapper);

    val = is(Array)(nextObj) ? map(assocPathByMapper, nextObj) : assocPathByMapper(nextObj);
  } else {
    val = mapper(obj[idx]);
  }

  return assoc(idx, val, obj);
});
