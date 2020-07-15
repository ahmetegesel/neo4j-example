import { prop } from 'ramda';

/**
 * Extracts properties from its node object that's extracted from
 * a Neo4j Query Result Item.
 *
 * This functions is useful when you want to extract properties field and
 * use it in your app as Plain Javascript Object removing unnecessary Neo4j
 * related fields and functions.
 *
 * @function
 * @type {Function}
 * @param {object} nodeObject Node object to extract properties from.
 * @return {*} Extracted value
 */
const extractProperties = prop('properties');

export default extractProperties;
