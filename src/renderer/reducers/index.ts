import accounts, { AccountsState } from '@/reducers/accounts';
import activeAccount, { ActiveAccountState } from '@/reducers/active_account';
import login, { LoginState } from '@/reducers/login';
import message, { MessageState } from '@/reducers/message';
import settings, { SettingsInterface } from '@/reducers/settings';
import verified_accounts, { VerifiedAccountsState } from '@/reducers/verified_accounts';
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
