import Mastodon from '@lagunehq/core';
import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory('Login');

export const fetchLoginUrlSubmit = actionCreator<{ host: string }>('FETCH_URL_SUBMIT');

export const fetchLoginUrl = actionCreator.async<
  { host: string },
  { url: string },
  Mastodon.Error
>('FETCH_URL');
