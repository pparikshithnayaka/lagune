import { reducerWithoutInitialState } from 'typescript-fsa-reducers';
import Mastodon from '@lagunehq/core';
import {
  verifyCodeProcess,
} from '@/actions/login';

export interface AccountsState { [key: string]: Mastodon.Account; }

export default reducerWithoutInitialState<AccountsState>()
  .case(verifyCodeProcess.done, (state, { result }) => ({ ...state, [result.account.id]: result.account }));
