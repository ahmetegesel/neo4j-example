import {
  curry, mapObjIndexed, omit, pick, pipe,
} from 'ramda';

/**
 * Maps given fields to given object by passing it to given mapper function.
 *
 * It simply picks given fields from given object, then process them by passing
 * the object to given mapper function, and finally returns the object with
 * modified fields.
 *
 * @function
 * @type {Function}
 * @param {Array<string>} fields Fields to be mapped
 * @param {function(object) : object} mapper Function to process given fields
 * @param {object} obj Object to modify the fields of
 * @return {object} Mapped object
 */
const mapFields = curry((fields, mapper, obj) => ({
  ...omit(fields, obj),
  ...pipe(pick(fields), mapObjIndexed(mapper))(obj),
}));

export default mapFields;
