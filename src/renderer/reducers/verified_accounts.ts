import {
  addVerifiedAccountProcess,
  fetchVerifiedAccountsProcess,
  removeVerifiedAccount,
} from '@/actions/verified_account';
import * as Lagune from '@@/typings/lagune';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

export type VerifiedAccountsState = Lagune.VerifiedAccount[];

const initialState: VerifiedAccountsState = [];

function appendToList (state: VerifiedAccountsState, result: Lagune.VerifiedAccount[]) {
  state = state.concat(result);

  return state;
}

function removeOneFromList (state: VerifiedAccountsState, payload: number) {
  delete state[payload];

  return state;
}

export default reducerWithInitialState(initialState)
  .case(fetchVerifiedAccountsProcess.done, (state, { result }) => appendToList(state, result))
  .case(addVerifiedAccountProcess.done,    (state, { result }) => appendToList(state, result))
  .case(removeVerifiedAccount, (state, payload) => removeOneFromList(state, payload));
