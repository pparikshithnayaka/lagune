import { VerifiedAccount } from '@@/typings/lagune';
import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory('VerifiedAccount');

export const fetchVerifiedAccounts        = actionCreator<{}>('FETCH');
export const fetchVerifiedAccountsProcess = actionCreator.async<void, VerifiedAccount[]>('FETCH_PROCESS');

export const addVerifiedAccount        = actionCreator<VerifiedAccount>('ADD');
export const addVerifiedAccountProcess = actionCreator.async<VerifiedAccount, VerifiedAccount[]>('ADD_PROCESS');

export const removeVerifiedAccount = actionCreator<number>('REMOVE');
