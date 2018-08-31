import { RootAction } from '@/actions';
import { changeActiveAccount } from '@/actions/active_account';
import { isType } from 'typescript-fsa';

export type ActiveAccountState = number;

const initialState: ActiveAccountState = 0;

export default function activeAccount (state = initialState, action: RootAction) {
  if (isType(action, changeActiveAccount)) {
    state = action.payload;
    return state;
  }

  return state;
}
