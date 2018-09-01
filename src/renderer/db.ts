import { VerifiedAccount } from '@/renderer/utils/registerClient';
import Dexie from 'dexie';

export class Laugne extends Dexie {
  public verified_accounts!: Dexie.Table<VerifiedAccountTable, number>;

  constructor () {
    super('lagune');

    const db = this;

    db.version(1).stores({
      verified_accounts: '++id, me, access_token, url, url_version, streaming_url',
    });
  }
}

export interface VerifiedAccountTable extends VerifiedAccount {
  id?: number;
}

export default new Laugne();
