import { accounts } from '@/renderer/features/accounts/reducer';
import { activeAccount } from '@/renderer/features/activeAccount/reducer';
import { database } from '@/renderer/features/database/reducer';
import { login } from '@/renderer/features/login/reducer';
import { message } from '@/renderer/features/message/reducer';
import { RootAction } from '@/renderer/store/actions';
import { combineReducers } from '@/renderer/utils/reducerManager/combineReducers';
import { Record as ImmutableRecord } from 'immutable';

const reducers = {
  accounts,
  login,
  message,
  database,
  activeAccount,
};

export type ReducersMap = {
  [S in keyof (typeof reducers)]: ReturnType<(typeof reducers)[S]>
};

export type RootState = ImmutableRecord<ReducersMap>;

export const reducer = combineReducers<ReducersMap, RootAction>(reducers);
