import { RootAction } from '@/renderer/actions';
import {
  fetchAuthorizationUrlProcess,
} from '@/renderer/actions/login';
import { Record as ImmutableRecord } from 'immutable';
import { Reducer } from 'redux';
import { isType } from 'typescript-fsa';

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

export class LoginState extends ImmutableRecord(defaultProps) {}

function startAuthorizationProcess (state: LoginState, host: string): LoginState {
  return state
    .set('host', host)
    .set('is_submitting', true);
}

function doneAuthorizationProcess (state: LoginState): LoginState {
  return state.set('is_submitted', true);
}

function fulfilledAuthorizationProcess (state: LoginState): LoginState {
  return state.set('is_submitting', false);
}

const initialState = new LoginState();

export const login: Reducer<LoginState, RootAction> = (state = initialState, action) => {
  if (isType(action, fetchAuthorizationUrlProcess.started)) {
    state = startAuthorizationProcess(state, action.payload);
  }

  if (isType(action, fetchAuthorizationUrlProcess.done)) {
    state = doneAuthorizationProcess(state);
  }

  if (
    isType(action, fetchAuthorizationUrlProcess.done) ||
    isType(action, fetchAuthorizationUrlProcess.failed)
  ) {
    state = fulfilledAuthorizationProcess(state);
  }

  return state;
};
