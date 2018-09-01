import { RootAction } from '@/renderer/actions';
import {
  addVerifiedAccountProcess,
  fetchVerifiedAccountsProcess,
  removeVerifiedAccount,
} from '@/renderer/actions/verified_account';
import { VerifiedAccount } from '@@/renderer/typings/lagune';
import { List as ImmutableList } from 'immutable';
import { isType } from 'typescript-fsa';

export type VerifiedAccountsState = ImmutableList<VerifiedAccount>;

function appendToList (state: VerifiedAccountsState, result: VerifiedAccount[]): VerifiedAccountsState {
  return state.merge(result);
}

function removeOneFromList (state: VerifiedAccountsState, index: number) {
  return state.delete(index);
}

const initialState: VerifiedAccountsState = ImmutableList();

export default function verifiedAccounts (state = initialState, action: RootAction) {
  if (
    isType(action, fetchVerifiedAccountsProcess.done) ||
    isType(action, addVerifiedAccountProcess.done)
  ) {
    return appendToList(state, action.payload.result);
  }

  if (isType(action, removeVerifiedAccount)) {
    return removeOneFromList(state, action.payload);
  }

  return state;
}
