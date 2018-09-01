import config from '@/renderer/config';
import { Credentials } from '@lagunehq/core';


export const fetchAuthorizationUrl = async (host: string) => {
  const response = await fetch(`${config.server_url}/oauth/url?host=${host}`);
  const result   = await response.json();

  if (response.ok) {
    return result as string;
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

  if (response.ok) {
    return result as Credentials;
  }

  throw new Error(result.error);
};
