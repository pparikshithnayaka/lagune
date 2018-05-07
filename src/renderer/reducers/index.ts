import { combineReducers } from 'redux';
import accounts, { AccountsState } from '@/reducers/accounts';
import login, { LoginInitialState } from '@/reducers/login';
import message, { MessageState } from '@/reducers/message';
import meta, { MetaState } from '@/reducers/meta';
import settings, { SettingsInterface } from '@/reducers/settings';
import activeAccount, { ActiveAccountState } from '@/reducers/active_account';

export interface RootState {
  accounts: AccountsState;
  login: LoginInitialState;
  message: MessageState;
  meta: MetaState;
  settings: SettingsInterface;
  activeAccount: ActiveAccountState;
}

export const reducer = combineReducers<RootState>({
  accounts,
  login,
  message,
  meta,
  settings,
  activeAccount,
});
