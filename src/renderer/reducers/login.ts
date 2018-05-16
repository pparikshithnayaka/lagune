import {
  fetchAuthorizationUrlProcess,
} from '@/actions/login';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface LoginState {
  /** Value of input element */
  host: string;

  /** Whether saga work in progress */
  is_submitting: boolean;

  /** Whether saga has done */
  is_submitted: boolean;
}

const intiialState: LoginState = {
  host: '',
  is_submitting: false,
  is_submitted: false,
};

export default reducerWithInitialState(intiialState)
  .case(fetchAuthorizationUrlProcess.started, (state, payload) => Object.assign({}, state, {
    host: payload,
    is_submitting: true,
  }))
  .case(fetchAuthorizationUrlProcess.done, (state) => ({ ...state, is_submitted: true }))
  .cases([
    fetchAuthorizationUrlProcess.done,
    fetchAuthorizationUrlProcess.failed,
  ], (state) => ({ ...state, is_submitting: false }));
