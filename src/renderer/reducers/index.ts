import { combineReducers } from 'redux';
import settings, { SettingsInterface } from '@/reducers/settings';
import login, { LoginInitialState } from '@/reducers/login';

export interface RootState {
  settings: SettingsInterface;
  login: LoginInitialState;
}

export const reducer = combineReducers<RootState>({
  settings,
  login,
});
