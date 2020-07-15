import { mapRelation } from './lib/mapping/mapRelation';

require('dotenv').config();
import neo4j from 'neo4j-driver';

import mapNodeResult from './lib/mapping/mapNodeResult';

(async () => {
  const driver = neo4j.driver(process.env.NEO4J_URL, neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD));
  const session = driver.session();

  try {

    const result = await session.run(
      `
        MATCH (p:Person)-[r:DIRECTED]->(m:Movie)
        MATCH (p)-[:PRODUCED]->(m)
        RETURN
            p,
            collect(distinct {Title:m.title,Tagline:m.tagline}) as m
      `
    );

    return mapNodeResult('p', result.records, [
        mapRelation(
          'm',
          [
            'movie',
            (item) => ({ tagline: item.Tagline, title: item.Title }),
          ],
        ),
      ]
    )
  } finally {
    await session.close();
    await driver.close();
  }
})().then(JSON.stringify).then(console.log);

/*
* Result would be something like this:
*
[
  {
    name: 'Robert Zemeckis',
    born: '1951',
    movie: {
      tagline: 'This Holiday Season… Believe',
      title: 'The Polar Express'
    }
  },
  {
    name: 'Penny Marshall',
    born: '1943',
    movie: {
      tagline: 'Once in a lifetime you get a chance to do something different.',
      title: 'A League of Their Own'
    }
  }
]
* */
