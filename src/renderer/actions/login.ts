import Mastodon from '@lagunehq/core';
import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory('Login');

export const fetchLoginUrl = actionCreator.async<string, { url: string }, Mastodon.Error>('FETCH_URL');
