import * as Lagune from '@@/renderer/typings/lagune';
import Dexie from 'dexie';

export class Laugne extends Dexie {
  public verified_accounts!: Dexie.Table<VerifiedAccountsTable, number>;

  constructor () {
    super('lagune');

    const db = this;

    db.version(1).stores({
        verified_accounts: '++id, me, access_token, url, url_version, streaming_url',
    });
  }
}

export interface VerifiedAccountsTable extends Lagune.VerifiedAccount {
  id?: number;
}

export default new Laugne();
