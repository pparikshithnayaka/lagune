import { VerifiedAccount } from '@/renderer/utils/database/tables/verified_account';
import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory('database');

export const fetchVerifiedAccounts = actionCreator<void>('FETCH_VERIFIED_ACCOUNTS');
export const fetchVerifiedAccountsProcess = actionCreator.async<
  void,
  VerifiedAccount[],
  Error
>('FETCH_VERIFIED_ACCOUNTS_PROCESS');

// `id` prop will be added by dexie automatically so not needed when inserting
export const addVerifiedAccount = actionCreator<Pick<VerifiedAccount, Exclude<keyof VerifiedAccount, 'id'>>>('ADD_VERIFIED_ACCOUNT');
export const addVerifiedAccountProcess = actionCreator.async<
  VerifiedAccount,
  VerifiedAccount[],
  Error
>('ADD_VERIFIED_ACCOUNT_PROCESS');

export const removeVerifiedAccount = actionCreator<number>('REMOVE_VERIFIED_ACCOUNT');
