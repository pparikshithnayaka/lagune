import { VerifiedAccount } from '@/renderer/utils/database/tables/verified_account';
import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory('Database');

export const fetchVerifiedAccounts = actionCreator<void>('FETCH_VERIFIED_ACCOUNTS');
export const fetchVerifiedAccountsProcess = actionCreator.async<
  void,
  VerifiedAccount[],
  Error
>('FETCH_VERIFIED_ACCOUNTS_PROCESS');

export const addVerifiedAccount = actionCreator<VerifiedAccount>('ADD_VERIFIED_ACCOUNT');
export const addVerifiedAccountProcess = actionCreator.async<
  VerifiedAccount,
  VerifiedAccount[],
  Error
>('ADD_VERIFIED_ACCOUNT_PROCESS');

export const removeVerifiedAccount = actionCreator<number>('REMOVE_VERIFIED_ACCOUNT');
