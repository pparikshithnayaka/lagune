import accounts, { AccountsState } from '@/renderer/reducers/accounts';
import activeAccount, { ActiveAccountState } from '@/renderer/reducers/active_account';
import login, { LoginState } from '@/renderer/reducers/login';
import message, { MessageState } from '@/renderer/reducers/message';
import settings, { SettingsInterface } from '@/renderer/reducers/settings';
import verified_accounts, { VerifiedAccountsState } from '@/renderer/reducers/verified_accounts';
import { combineReducers } from 'redux';

export interface RootState {
  accounts: AccountsState;
  login: LoginState;
  message: MessageState;
  verified_accounts: VerifiedAccountsState;
  settings: SettingsInterface;
  activeAccount: ActiveAccountState;
}

export const reducer = combineReducers<RootState>({
  accounts,
  login,
  message,
  verified_accounts,
  settings,
  activeAccount,
});
