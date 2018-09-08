export interface VerifiedAccount {
  /** Unique id */
  id: number;

  /** User id of authorized user */
  me: string;

  /** Access token for the API */
  access_token: string;

  /** URL of host (e.g. `https://mastodon.social`) */
  url: string;

  /** URI of streaming API (e.g. `wss://mastodon.social`) */
  streaming_url: string;

  /** Kind of the logged in service */
  platform: string;
}
