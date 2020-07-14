/**
 * Gets an Neo4j record and discards all functions and other related util fields,
 * and returns it as plain javascript object.
 *
 * @function
 * @type {Function}
 * @param {object} Neo4j raw result item
 * @return {object} An object that is discarded all functions.
 * */
const toNeoObject = (item) => item.toObject();

export default toNeoObject;
