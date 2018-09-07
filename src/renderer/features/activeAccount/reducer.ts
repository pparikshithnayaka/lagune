import { RootAction } from '@/renderer/store/actions';
import { changeActiveAccount } from '@/renderer/features/activeAccount/actions';
import { Reducer } from 'redux';
import { isType } from 'typescript-fsa';

export type ActiveAccountState = number;

const initialState: ActiveAccountState = 0;

export const activeAccount: Reducer<ActiveAccountState, RootAction> = (state = initialState, action) => {
  if (isType(action, changeActiveAccount)) {
    state = action.payload;
    return state;
  }

  return state;
};
