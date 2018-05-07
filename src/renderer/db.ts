import * as Lagune from '@@/typings/lagune';
import Dexie from 'dexie';

class LaguneDB extends Dexie {
  public verified_accounts!: Dexie.Table<Lagune.VerifiedAccount, number>;

  constructor () {
    super('Lagune');
    this.version(1).stores({
      verified_accounts: '++id, me, access_token, url, url_version, streaming_url',
    });
  }
}

const db = new LaguneDB();

export default db;
