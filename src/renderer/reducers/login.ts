import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
  fetchLoginUrlProcess,
} from '@/actions/login';

export interface LoginInitialState {
  host: string;
  is_submitting: boolean;
  is_submitted: boolean;
}

const intiialState: LoginInitialState = {
  host: '',
  is_submitting: false,
  is_submitted: false,
};

export default reducerWithInitialState(intiialState)
  .case(fetchLoginUrlProcess.started, (state, payload) => ({ ...state, host: payload.host, is_submitting: true }))
  .case(fetchLoginUrlProcess.done, (state) => ({ ...state, is_submitted: true }))
  .cases([
    fetchLoginUrlProcess.done,
    fetchLoginUrlProcess.failed,
  ], (state) => ({ ...state, is_submitting: false }));
