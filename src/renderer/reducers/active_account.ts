import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { changeActiveAccount } from '@/actions/active_account';

export type ActiveAccountState = number;

const initialState: ActiveAccountState = 0;

export default reducerWithInitialState(initialState)
  .case(changeActiveAccount, (_, payload) => (payload));
