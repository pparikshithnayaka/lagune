import { RootAction } from '@/renderer/actions';
import { accounts } from '@/renderer/reducers/accounts';
import { activeAccount } from '@/renderer/reducers/active_account';
import { database } from '@/renderer/reducers/database';
import { login } from '@/renderer/reducers/login';
import { message } from '@/renderer/reducers/message';
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
