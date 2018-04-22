import Mastodon from '@lagunehq/core';
import config from '@/config';

export interface LaguneServerError {
  error: string;
}

export interface LaguneUrl {
  url: string;
}

export interface LaguneVerify {
  me: Mastodon.Credentials;
  token: string;
}

export const fetchUrl = async (host: string) => {
  const response = await fetch(`${config.server_url}/oauth/url?host=${host}`);
  const result   = await response.json();

  if (response.ok) {
    return result as LaguneUrl;
  }

  throw result as LaguneServerError;
};

export const verifyToken = async (host: string, code: string) => {
  const response = await fetch(`${config.server_url}/oauth/url`, {
    method: 'POST',
    body: JSON.stringify({ host, code }),
  });
  const result   = await response.json();

  if (response.ok) {
    return result as LaguneVerify;
  }

  throw result as LaguneServerError;
};
