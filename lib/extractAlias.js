import { prop, uncurryN } from 'ramda';

/**
 * Extracts the node object from its alias field in the given
 * Neo4j Query Result Item.
 *
 * @function
 * @type {Function}
 * @param {string} nodeAlias Alias name of given node result.
 * @param {object} resultItem Result Item object to extract alias from.
 * @return {*} Extracted value
 */
const extractAlias = uncurryN(2, (nodeAlias) => prop(nodeAlias));

export default extractAlias;
