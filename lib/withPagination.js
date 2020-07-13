const withPagination = (page, limit, query) => `
  ${query}
  SKIP ${(page - 1) * limit}
  LIMIT ${limit}
`;

export default withPagination;
