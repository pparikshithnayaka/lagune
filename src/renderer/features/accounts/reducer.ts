import {
  fetchAccountProcess,
} from '@/renderer/features/accounts/actions';
import { RootAction } from '@/renderer/store/actions';
import { Account } from '@lagunehq/core';
import { Map as ImmutableMap } from 'immutable';
import { Reducer } from 'redux';
import { isType } from 'typescript-fsa';

export type AccountsState = ImmutableMap<string, Account>;

function normalizeAccount (state: AccountsState, account: Account) {
  return state.set(account.id, account);
}

const initialState: AccountsState = ImmutableMap();

export const accounts: Reducer<AccountsState, RootAction> = (state = initialState, action) => {
  if (isType(action, fetchAccountProcess.done)) {
    return normalizeAccount(state, action.payload.result);
  }

  return state;
};
