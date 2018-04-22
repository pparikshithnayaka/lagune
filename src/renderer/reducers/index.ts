import { combineReducers } from 'redux';
import settings, { SettingsInterface } from '@/reducers/settings';

export interface RootState {
  settings: SettingsInterface;
}

export const reducer = combineReducers<RootState>({
  settings,
});
