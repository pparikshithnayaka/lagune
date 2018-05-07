import Mastodon from '@lagunehq/core';
import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory('Login');

export const fetchAuthorizationUrl = actionCreator<string>('FETCH_AUTHORIZATION_URL');

export const fetchAuthorizationUrlProcess = actionCreator.async<
  string,
  { url: string },
  Mastodon.Error
>('FETCH_URL_PROCESS');

export const verifyCode = actionCreator<string>('VERIFY_CODE');

export const verifyCodeProcess = actionCreator.async<
  string,
  any,
  Mastodon.Error
>('VERIFY_CODE_PROCESS');
