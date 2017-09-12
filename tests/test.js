import {Database, model, field} from '../src';

@model()
class Shelf {
  @field({column: 'shelf_id'})
  id = 0;

  @field()
  name = '';
}

@model()
class Book {
  @field({column: 'book_id'})
  id = 0;

  @field()
  name = '';

  @field({
    reference: {
      model: Shelf
    }
  })
  shelf = null;
}

async function start() {
  const db = new Database('mysql://root@192.168.0.100', {
    database: 'test_orm'
  });

  /*
   *
   */
  let sql = `DROP TABLE book`;
  await db.query(sql);

  sql = `CREATE TABLE IF NOT EXISTS book(
    book_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    used BOOLEAN NOT NULL DEFAULT FALSE
  )`;
  await db.query(sql);

  console.log('-----------------------------------------------------------');

  /*
   *
   */
  await db.transaction(async () => {
    console.log('ZONE:', Zone.current.name);

    const sql =
      `INSERT INTO book (name, used) VALUES
        ('Book 1', true),
        ('Book 2', false)`;
    return db.query(sql);
  });

  console.log('-----------------------------------------------------------');

  /*
   *
   */
  await db.transaction(async () => {
    const books = await Book.find();
    // console.log(JSON.stringify(book));
    console.log(books);
  });

  console.log('-----------------------------------------------------------');
  db.close();
}

start().catch(err => {
  console.error('ERROR', err.stack);
  process.exit(1);
});



const doc = col.find({
  a: 1, /* a == 1 */
  b: {  /* b > 2 */
    $gt: 2
  },
  c: {  /* strlen(c) > 5 */
    $strlen: {
      $gt: 5
    }
  }
});

const doc = col.find({
  a: {
    $eq: 1
  },
  b: {
    $gt: 2
  }
});

const stmt = [
  {fn: '$eq', args: ['a', 1]},
  {fn: '$gt', args: ['b', 2]}
];

const stmt = [
  ['$eq', ['a', 1]],
  ['$gt', ['b', 2]]
];

const t = $and($eq('a', 1), $gt('b', 2));
