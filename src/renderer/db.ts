import Dexie from 'dexie';

export interface Meta {
  /** User id of authorized user */
  me: string;

  /** Access token for the API */
  access_token: string;

  /** URL of host (e.g. `https://mastodon.social`) */
  url: string;

  /** Suffix of URL which respresents version of the API */
  url_version: string;

  /** URI of streaming API (e.g. `wss://mastodon.social`) */
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
