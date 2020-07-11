const { config } = require('dotenv');
const neo4j = require('neo4j-driver');
const { head, map, tap, type, path } = require('ramda');

config();

const driver = neo4j.driver(process.env.NEO4J_URL, neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD));
const session = driver.session();

const isNeoInt = neo4j.types.Integer.isInteger;
const toNumber = i => i.toNumber();

(async () => {
  try {
    const result = await session.run(
      'MATCH (movie:Movie {title: \'Top Gun\'}) <- [:DIRECTED] - (person:Person) RETURN person, movie'
    );

    return head(map((r) => r.toObject(), result.records));
  } finally {
    await session.close();
  }
})()
  .then(r => {
      console.log(isNeoInt(path(['person', 'identity'], r)));
      return r;
    }
  )
  .then(console.log).finally(() => driver.close());
