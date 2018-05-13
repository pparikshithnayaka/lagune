import * as Lagune from '@@/typings/lagune';
import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory('VerifiedAccount');

export const fetchVerifiedAccounts = actionCreator<{}>('FETCH');

export const fetchVerifiedAccountsProcess = actionCreator.async<
  {},
  Lagune.VerifiedAccount[]
>('FETCH_PROCESS');

export const addVerifiedAccount = actionCreator<Lagune.VerifiedAccount>('ADD');

export const addVerifiedAccountProcess = actionCreator.async<
  Lagune.VerifiedAccount,
  Lagune.VerifiedAccount[]
>('ADD_PROCESS');

export const removeVerifiedAccount = actionCreator<number>('REMOVE');
