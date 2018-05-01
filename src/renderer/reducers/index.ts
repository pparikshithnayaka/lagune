import { combineReducers } from 'redux';
import login, { LoginInitialState } from '@/reducers/login';
import message, { MessageState } from '@/reducers/message';
import meta, { MetaState } from '@/reducers/meta';
import settings, { SettingsInterface } from '@/reducers/settings';

export interface RootState {
  login: LoginInitialState;
  message: MessageState;
  meta: MetaState;
  settings: SettingsInterface;
}

export const reducer = combineReducers<RootState>({
  login,
  message,
  meta,
  settings,
});
