import Dexie from 'dexie';

export interface Meta {
  me: string;
  access_token: string;
  url: string;
  url_version: string;
  streaming_url: string;
}

class LaguneDB extends Dexie {

  public meta!: Dexie.Table<Meta, number>;

  constructor () {
    super('Lagune');

    this.version(1).stores({
      meta: [
        '&me',
        'access_token',
        'url',
        'url_version',
        'streaming_url',
      ].join(','),
    });
  }
}

const db = new LaguneDB();

export default db;
