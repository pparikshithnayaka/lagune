import { RootAction } from '@/actions';
// import { isType } from 'typescript-fsa';

export interface SettingsInterface {
  lang: string;
}

const intiialState: SettingsInterface = {
  lang: 'en',
};

export default function settings (state = intiialState, action: RootAction) {
  return state;
}
