/**
 * Wraps given query with SKIP LIMIT keywords which are applied with given
 * page and limit values.
 *
 * @function
 * @type {Function}
 * @param {number} page
 * @param {number} limit
 * @param {string} query
 * @return {string} Query string that has pagination
 * @example
 *
 * withPagination(
 *  2,
 *  10,
 *  'MATCH (p:Person)-[r:DIRECTED]->(m:Movie) RETURN m,p',
 * );
 *
 * // 'MATCH (p:Person)-[r:DIRECTED]->(m:Movie) RETURN m,p SKIP 10 LIMIT 10'
 * */
const withPagination = (page, limit, query) => `
  ${query}
  SKIP ${(page - 1) * limit}
  LIMIT ${limit}
`;

export default withPagination;
