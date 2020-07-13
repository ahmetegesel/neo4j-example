import neo4j from 'neo4j-driver';

const isNeoInt = neo4j.types.Integer.isInteger;

export default isNeoInt;
