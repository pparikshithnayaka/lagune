import {
  addVerifiedAccountProcess,
  fetchVerifiedAccountsProcess,
  removeVerifiedAccount,
} from '@/renderer/features/database/actions';
import { RootAction } from '@/renderer/store/actions';
import { VerifiedAccount } from '@/renderer/utils/database/tables/verified_account';
import {
  Map as ImmutableMap,
  Record as ImmutableRecord,
} from 'immutable';
import { Reducer } from 'redux';
import { isType } from 'typescript-fsa';

interface RecordProp {
  verified_accounts: ImmutableMap<number, VerifiedAccount>;
}

const defaultProps: RecordProp = {
  verified_accounts: ImmutableMap(),
};

export class DatabaseState extends ImmutableRecord(defaultProps) {}

function appendVerifiedAccountToList (state: DatabaseState, verifiedAccount: VerifiedAccount): DatabaseState {
  return state.update('verified_accounts', (map) => (
    map.set(verifiedAccount.id, verifiedAccount)
  ));
}

function appendVerifiedAccountsToList (state: DatabaseState, verifiedAccounts: VerifiedAccount[]): DatabaseState {
  verifiedAccounts.forEach((verifiedAccount) => {
    state = appendVerifiedAccountToList(state, verifiedAccount);
  });

  return state;
}

function removeVerifiedAccountFromList (state: DatabaseState, id: number) {
  return state.updateIn(['verified_accounts'], (map) => (
    map.delete(id)
  ));
}

const initialState = new DatabaseState();

export const database: Reducer<DatabaseState, RootAction> = (state = initialState, action) => {
  if (
    isType(action, fetchVerifiedAccountsProcess.done) ||
    isType(action, addVerifiedAccountProcess.done)
  ) {
    return appendVerifiedAccountsToList(state, action.payload.result);
  }

  if (isType(action, removeVerifiedAccount)) {
    return removeVerifiedAccountFromList(state, action.payload);
  }

  return state;
};
