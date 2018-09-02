import Dexie from 'dexie';

export class Laugne extends Dexie {
  public verified_accounts!: Dexie.Table<VerifiedAccount, number>;

  constructor () {
    super('lagune');

    const db = this;

    db.version(1).stores({
      verified_accounts: '++id, me, access_token, url, url_version, streaming_url',
    });
  }
}

export interface VerifiedAccount {
  /** Unique id */
  id?: number;

  /** User id of authorized user */
  me: string;

  /** Access token for the API */
  access_token: string;

  /** URL of host (e.g. `https://mastodon.social`) */
  url: string;

  /** Suffix of URL which represents version of the API */
  url_version: string;

  /** URI of streaming API (e.g. `wss://mastodon.social`) */
  streaming_url: string;
}

export default new Laugne();
