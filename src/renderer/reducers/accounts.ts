import { RootAction } from '@/renderer/actions';
import {
  fetchAccountProcess,
} from '@/renderer/actions/accounts';
import { Account } from '@lagunehq/core';
import { Map as ImmutableMap } from 'immutable';
import { isType } from 'typescript-fsa';

export type AccountsState = ImmutableMap<string, Account>;

function normalizeAccount (state: AccountsState, account: Account) {
  return state.set(account.id, account);
}

const initialState: AccountsState = ImmutableMap();

export default function accounts (state = initialState, action: RootAction) {
  if (isType(action, fetchAccountProcess.done)) {
    return normalizeAccount(state, action.payload.result);
  }

  return state;
}
