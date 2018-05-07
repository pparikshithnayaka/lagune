import {
  addVerifiedAccount,
  fetchVerifiedAccountsProcess,
  removeVerifiedAccount,
} from '@/actions/verified_account';
import * as Lagune from '@@/typings/lagune';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

export type VerifiedAccountsState = Lagune.VerifiedAccount[];

const initialState: VerifiedAccountsState = [];

function appendToList (state: VerifiedAccountsState, payload: Lagune.VerifiedAccount[]) {
  state.push.apply(payload);

  return state;
}

function appendOneToList (state: VerifiedAccountsState, payload: Lagune.VerifiedAccount) {
  state.push(payload);

  return state;
}

function removeFromList (state: VerifiedAccountsState, payload: number) {
  delete state[payload];

  return state;
}

export default reducerWithInitialState(initialState)
  .case(fetchVerifiedAccountsProcess.done, (state, payload) => appendToList(state, payload.result))
  .case(addVerifiedAccount,    (state, payload) => appendOneToList(state, payload))
  .case(removeVerifiedAccount, (state, payload) => removeFromList(state, payload));
