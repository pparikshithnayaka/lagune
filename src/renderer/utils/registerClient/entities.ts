import { Instance } from '@lagunehq/core';

export interface ServerError {
  error: string;
}

export interface Url {
  url: string;
}

export interface Credentials {
  access_token: string;
  account: Credentials;
  instance: Instance;
}

export interface VerifiedAccount {
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

