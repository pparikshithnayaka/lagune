import { RootAction } from '@/renderer/actions';
import { accounts } from '@/renderer/reducers/accounts';
import { activeAccount } from '@/renderer/reducers/active_account';
import { database } from '@/renderer/reducers/database';
import { login } from '@/renderer/reducers/login';
import { message } from '@/renderer/reducers/message';
import { Record as ImmutableRecord } from 'immutable';
import { Reducer } from 'redux';

export class RootState extends ImmutableRecord({
  accounts,
  login,
  message,
  database,
  activeAccount,
}) {}

const reducersMap = new RootState();

export function reducer (state: RootState | undefined, action: RootAction): RootState {
  if (!state) {
    return reducersMap;
  }

  console.log(action.type);

  for (const [ name, reducer ] of reducersMap) {
    const previousStateForKey = state.get(name, undefined);
    const nextStateForKey     = (reducer as Reducer)(previousStateForKey, action);
    state.set(name, nextStateForKey);
  }

  return state;
}
