import {DependencyInjector, inject} from '@lxndr/di';
import {Database} from '@lxndr/orm';


class  {
}

export class Collection {
  @inject(Database) db;

  update() {
    
  }
}

const db = new Database({
  driver: 'nedb',
  path: './test.db'
});

const di = new DependencyInjector({
  providers: [
    {provide: Database, useValue: db}
  ]
});

const collection = di.create(Collection);
