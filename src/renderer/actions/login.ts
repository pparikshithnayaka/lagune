import Mastodon from '@lagunehq/core';
import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory('Login');

export const fetchLoginUrl = actionCreator<{ host: string }>('FETCH_URL');

export const fetchLoginUrlProcess = actionCreator.async<
  { host: string },
  { url: string },
  Mastodon.Error
>('FETCH_URL_PROCESS');

export const verifyCode = actionCreator<{ code: string}>('VERIFY_CODE');

export const verifyCodeProcess = actionCreator.async<
  { code: string },
  any,
  Mastodon.Error
>('VERIFY_CODE_PROCESS');
