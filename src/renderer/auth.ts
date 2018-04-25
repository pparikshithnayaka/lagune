import Mastodon from '@lagunehq/core';
import config from '@/config';

export interface LaguneServerError {
  error: string;
}

export interface LaguneUrl {
  url: string;
}

export interface LaguneVerify {
  access_token: string;
  account: Mastodon.Credentials;
  instance: Mastodon.Instance;
}

export const fetchUrlRequest = async (host: string) => {
  const response = await fetch(`${config.server_url}/oauth/url?host=${host}`);
  const result   = await response.json();

  if (response.ok) {
    return result as LaguneUrl;
  }

  throw result as LaguneServerError;
};

export const verifyCodeRequest = async (host: string, code: string) => {
  const response = await fetch(`${config.server_url}/oauth/verify`, {
    method: 'POST',
    body: JSON.stringify({ host, code }),
    headers: { 'Content-Type': 'application/json' },
  });
  const result   = await response.json();

  if (response.ok) {
    return result as LaguneVerify;
  }

  throw result as LaguneServerError;
};
