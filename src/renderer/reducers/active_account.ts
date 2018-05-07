import { changeActiveAccount } from '@/actions/active_account';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

export type ActiveAccountState = number;

const initialState: ActiveAccountState = 0;

export default reducerWithInitialState(initialState)
  .case(changeActiveAccount, (_, payload) => (payload));
