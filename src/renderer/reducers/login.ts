import {
  fetchAuthorizationUrlProcess,
} from '@/actions/login';
import { Record } from 'immutable';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

interface RecordProps {
  /** Value of input element */
  host: string;

  /** Whether saga work in progress */
  is_submitting: boolean;

  /** Whether saga has done */
  is_submitted: boolean;
}

const defaultProps: RecordProps = {
  host: '',
  is_submitting: false,
  is_submitted: false,
};

export class LoginState extends Record(defaultProps) {}


function startAuthorizationProcess (state: LoginState, host: string): LoginState {
  return state.withMutations((record) => {
    record.set('host', host);
    record.set('is_submitting', true);
  });
}

function finishAuthorizationProcess (state: LoginState): LoginState {
  return state.setIn(['is_submitted'], true);
}

function fulfilAuthorizationProcess (state: LoginState): LoginState {
  return state.setIn(['is_submitting'], true);
}


const initialState = new LoginState();

export default reducerWithInitialState(initialState)
  .case(fetchAuthorizationUrlProcess.started, (state, payload) => startAuthorizationProcess(state, payload))
  .case(fetchAuthorizationUrlProcess.done,    (state) => finishAuthorizationProcess(state))
  .cases([
    fetchAuthorizationUrlProcess.done,
    fetchAuthorizationUrlProcess.failed,
  ], (state) => fulfilAuthorizationProcess(state));
