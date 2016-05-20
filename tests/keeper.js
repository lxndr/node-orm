import {Database, model, field} from '../src';

@model()
class Param {
  @field({type: 'string', nullable: false})
  name = null;

  @field({type: 'string', nullable: false})
  type = null;

  @field({type: 'string'})
  value = null;
}

async function start() {
  const db = new Database({
    driver: 'sqlite'
  });

  await db.transaction(async () => {
    await db.query(`CREATE TABLE param (
      name TEXT,
      type TEXT,
      value TEXT
    )`);

    const param = new Param({
      name: 'version',
      type: 'i',
      value: 1
    });

    await param.persist();
  });
}

start().catch(err => {
  console.error(err.stack);
});
