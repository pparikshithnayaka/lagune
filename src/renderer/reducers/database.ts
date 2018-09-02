import { RootAction } from '@/renderer/actions';
import {
  addVerifiedAccountProcess,
  fetchVerifiedAccountsProcess,
  removeVerifiedAccount,
} from '@/renderer/actions/database';
import { VerifiedAccount } from '@/renderer/db';
import { List as ImmutableList } from 'immutable';
import { isType } from 'typescript-fsa';

export type DatabaseState = ImmutableList<VerifiedAccount>;

function appendToList (state: DatabaseState, result: VerifiedAccount[]): DatabaseState {
  return state.merge(result);
}

function removeOneFromList (state: DatabaseState, index: number) {
  return state.delete(index);
}

const initialState: DatabaseState = ImmutableList();

export default function database (state = initialState, action: RootAction) {
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
