import { VerifiedAccount } from '@/renderer/utils/database/tables/verified_account';
import Dexie from 'dexie';

export class Laugne extends Dexie {
  public verified_accounts!: Dexie.Table<VerifiedAccount, number>;

  constructor () {
    super('lagune');

    this.version(1).stores({
      verified_accounts: '++id, me, access_token, url, streaming_url, platform',
    });
  }
}

export default new Laugne();
