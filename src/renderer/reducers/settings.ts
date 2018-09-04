import { RootAction } from '@/renderer/actions';
// import { isType } from 'typescript-fsa';

export interface SettingsInterface {
  lang: string;
}

const intiialState: SettingsInterface = {
  lang: 'en',
};

export default function settings (state = intiialState, _: RootAction) {
  return state;
}
