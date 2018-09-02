import config from '@/renderer/config';
import querystring from 'querystring';

export const fetchAuthorizationUrl = async (host: string) => {
  const response = await fetch(`${config.server_url}/oauth/url?${querystring.stringify({ host })}`);
  const result   = await response.json();

  if (response.ok && result.url) {
    return result.url as string;
  }

  throw new Error(result.error);
};

export const verifyCode = async (host: string, code: string) => {
  const response = await fetch(`${config.server_url}/oauth/verify`, {
    method: 'POST',
    body: JSON.stringify({ host, code }),
    headers: { 'Content-Type': 'application/json' },
  });

  const result = await response.json();

  if (response.ok && result.access_token) {
    return result.access_token as string;
  }

  throw new Error(result.error);
};
