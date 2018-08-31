import {
  addVerifiedAccountProcess,
  fetchVerifiedAccountsProcess,
  removeVerifiedAccount,
} from '@/actions/verified_account';
import { VerifiedAccount } from '@@/typings/lagune';
import { List as ImmutableList } from 'immutable';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

export type VerifiedAccountsState = ImmutableList<VerifiedAccount>;

function appendToList (state: VerifiedAccountsState, result: VerifiedAccount[]): VerifiedAccountsState {
  return state.merge(result);
}

function removeOneFromList (state: VerifiedAccountsState, index: number) {
  return state.delete(index);
}

const initialState: VerifiedAccountsState = ImmutableList();

export default reducerWithInitialState(initialState)
  .case(fetchVerifiedAccountsProcess.done, (state, { result }) => appendToList(state, result))
  .case(addVerifiedAccountProcess.done,    (state, { result }) => appendToList(state, result))
  .case(removeVerifiedAccount,             (state, payload) => removeOneFromList(state, payload));
