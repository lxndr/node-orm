import {Database} from '../src';

async function run() {
  const db = new Database({
    driver: 'arangodb',
    database: 'hwdb'
  });

  const col = db.collection('vendors');
  const item = await col.findById(331349);

  console.log(item);
}

run().catch(err => {
  console.error(err);
});
