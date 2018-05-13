import * as Lagune from '@@/typings/lagune';
import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory('VerifiedAccount');

export const fetchVerifiedAccounts = actionCreator<{}>('FETCH_VERIFIED_ACCOUNTS');

export const fetchVerifiedAccountsProcess = actionCreator.async<
  {},
  Lagune.VerifiedAccount[]
>('FETCH_VERIFIED_ACCOUNTS_PROCESS');

export const addVerifiedAccount = actionCreator<Lagune.VerifiedAccount>('ADD_VERIFIED_ACCOUNT');

export const addVerifiedAccountProcess = actionCreator.async<
  Lagune.VerifiedAccount,
  Lagune.VerifiedAccount[]
>('ADD_VERIFIED_ACCOUNT_PROCESS');

export const removeVerifiedAccount = actionCreator<number>('REMOVE_VERIFIED_ACCOUNT');
