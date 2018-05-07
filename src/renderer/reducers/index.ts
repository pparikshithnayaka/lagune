import { combineReducers } from 'redux';
// import accounts, { AccountsState } from '@/reducers/accounts';
import login, { LoginInitialState } from '@/reducers/login';
import message, { MessageState } from '@/reducers/message';
import verified_accounts, { VerifiedAccountsState } from '@/reducers/verified_accounts';
import settings, { SettingsInterface } from '@/reducers/settings';
import activeAccount, { ActiveAccountState } from '@/reducers/active_account';

export interface RootState {
  // accounts: AccountsState;
  login: LoginInitialState;
  message: MessageState;
  verified_accounts: VerifiedAccountsState;
  settings: SettingsInterface;
  activeAccount: ActiveAccountState;
}

export const reducer = combineReducers<RootState>({
  // accounts,
  login,
  message,
  verified_accounts,
  settings,
  activeAccount,
});
