import config from '@/config';
import Mastodon from '@lagunehq/core';

export interface ServerError {
  error: string;
}

export interface Url {
  url: string;
}

export interface Credentials {
  access_token: string;
  account: Mastodon.Credentials;
  instance: Mastodon.Instance;
}

export const fetchAuthorizationUrl = async (host: string) => {
  const response = await fetch(`${config.server_url}/oauth/url?host=${host}`);
  const result   = await response.json();

  if (response.ok) {
    return result as Url;
  }

  throw result as ServerError;
};

export const verifyCode = async (host: string, code: string) => {
  const response = await fetch(`${config.server_url}/oauth/verify`, {
    method: 'POST',
    body: JSON.stringify({ host, code }),
    headers: { 'Content-Type': 'application/json' },
  });
  const result   = await response.json();

  if (response.ok) {
    return result as Credentials;
  }

  throw result as ServerError;
};
