import accounts, { AccountsState } from '@/renderer/reducers/accounts';
import activeAccount, { ActiveAccountState } from '@/renderer/reducers/active_account';
import database, { DatabaseState } from '@/renderer/reducers/database';
import login, { LoginState } from '@/renderer/reducers/login';
import message, { MessageState } from '@/renderer/reducers/message';
import settings, { SettingsInterface } from '@/renderer/reducers/settings';
import { combineReducers } from 'redux';

export interface RootState {
  accounts: AccountsState;
  login: LoginState;
  message: MessageState;
  database: DatabaseState;
  settings: SettingsInterface;
  activeAccount: ActiveAccountState;
}

export const reducer = combineReducers<RootState>({
  accounts,
  login,
  message,
  database,
  settings,
  activeAccount,
});
