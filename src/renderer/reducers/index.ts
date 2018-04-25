import { combineReducers } from 'redux';
import settings, { SettingsInterface } from '@/reducers/settings';
import login, { LoginInitialState } from '@/reducers/login';
import message, { MessageState } from '@/reducers/message';

export interface RootState {
  settings: SettingsInterface;
  login: LoginInitialState;
  message: MessageState;
}

export const reducer = combineReducers<RootState>({
  settings,
  login,
  message,
});
