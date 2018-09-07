import { Account } from '@lagunehq/core';
import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory('Accounts');

export const fetchAccount        = actionCreator<string>('FETCH');
export const fetchAccountProcess = actionCreator.async<
  string,
  Account,
  Error
>('FETCH_PROCESS');
