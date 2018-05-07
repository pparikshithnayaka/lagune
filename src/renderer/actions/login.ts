import Mastodon from '@lagunehq/core';
import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory('Login');

export const fetchAuthorizationUrl = actionCreator<string>('FETCH_AUTHORIZATION_URL');

export const fetchAuthorizationUrlProcess = actionCreator.async<
  string,
  { url: string },
  Mastodon.Error
>('FETCH_URL_PROCESS');

export const identifyCode = actionCreator<string>('IDENTIFY_CODE');

export const identifyCodeProcess = actionCreator.async<
  string,
  any,
  Mastodon.Error
>('IDENTIFY_CODE_PROCESS');
