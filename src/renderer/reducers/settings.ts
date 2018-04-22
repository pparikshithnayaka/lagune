import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface SettingsInterface {
  lang: string;
}

const intiialState: SettingsInterface = {
  lang: 'en',
};

export default reducerWithInitialState(intiialState);
