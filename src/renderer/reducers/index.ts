import accounts, { AccountsState } from '@/renderer/reducers/accounts';
import activeAccount, { ActiveAccountState } from '@/renderer/reducers/active_account';
import database, { DatabaseState } from '@/renderer/reducers/database';
import login, { LoginState } from '@/renderer/reducers/login';
import message, { MessageState } from '@/renderer/reducers/message';
import settings, { SettingsInterface } from '@/renderer/reducers/settings';
import { Map as ImmutableMap } from 'immutable';
import { combineReducers } from 'redux-immutable';

interface Reducers {
  accounts: AccountsState;
  login: LoginState;
  message: MessageState;
  database: DatabaseState;
  settings: SettingsInterface;
  activeAccount: ActiveAccountState;
}

export type RootState = ImmutableMap<
  keyof Reducers,
  Reducers[keyof Reducers]
>;

export const reducer = combineReducers<RootState>({
  accounts,
  login,
  message,
  database,
  settings,
  activeAccount,
});
