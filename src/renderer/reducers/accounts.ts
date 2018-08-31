import {
  fetchAccountProcess,
} from '@/actions/accounts';
import { Account, Credentials } from '@lagunehq/core';
import { Map as ImmutableMap } from 'immutable';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

function normalizeAccount (state: AccountsState, account: Account|Credentials) {
  return state.set(account.id, account);
}

export type AccountsState = ImmutableMap<string, Account>;

const initialState: AccountsState = ImmutableMap();

export default reducerWithInitialState<AccountsState>(initialState)
  .case(fetchAccountProcess.done, (state, { result }) => normalizeAccount(state, result));
