import actionCreatorFactory from 'typescript-fsa';
import Mastodon from '@lagunehq/core';

const actionCreator = actionCreatorFactory('Accounts');

export const fetchAccount = actionCreator<string>('FETCH');

export const fetchAccountProcess = actionCreator.async<
  string,
  Mastodon.Account,
  Mastodon.Error
>('FETCH_PROCESS');
