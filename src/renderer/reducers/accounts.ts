import {
  verifyCodeProcess,
} from '@/actions/login';
import Mastodon from '@lagunehq/core';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface AccountsState { [key: string]: Mastodon.Account; }

const initialState: AccountsState = {};

export default reducerWithInitialState<AccountsState>(initialState)
  .case(verifyCodeProcess.done, (state, { result }) => ({ ...state, [result.account.id]: result.account }));
