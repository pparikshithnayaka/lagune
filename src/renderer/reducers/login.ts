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
  return state.withMutations((record) => {
    record.set('host', host);
    record.set('is_submitting', true);
  });
}

function finishAuthorizationProcess (state: LoginState): LoginState {
  return state.set('is_submitted', true);
}

function fulfilAuthorizationProcess (state: LoginState): LoginState {
  return state.set('is_submitting', true);
}

const initialState = new LoginState();

export const login: Reducer<LoginState, RootAction> = (state = initialState, action) => {
  if (isType(action, fetchAuthorizationUrlProcess.started)) {
    return startAuthorizationProcess(state, action.payload);
  }

  if (isType(action, fetchAuthorizationUrlProcess.done)) {
    return finishAuthorizationProcess(state);
  }

  if (
    isType(action, fetchAuthorizationUrlProcess.done) ||
    isType(action, fetchAuthorizationUrlProcess.failed)
  ) {
    return fulfilAuthorizationProcess(state);
  }

  return state;
};
