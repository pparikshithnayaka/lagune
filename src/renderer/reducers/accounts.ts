import { reducerWithInitialState } from 'typescript-fsa-reducers';
import Mastodon from '@lagunehq/core';
import {
  verifyCodeProcess,
} from '@/actions/login';

export interface AccountsState { [key: string]: Mastodon.Account; }

const initialState: AccountsState = {};

export default reducerWithInitialState<AccountsState>(initialState)
  .case(verifyCodeProcess.done, (state, { result }) => ({ ...state, [result.account.id]: result.account }));
