import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
  showMessage,
  hideMessage,
} from '@/actions/message';

export interface MessageState {
  type: 'success'|'failure'|'hidden';
  text: string;
}

const initialState: MessageState = {
  type: 'success',
  text: '',
};

export default reducerWithInitialState(initialState)
  .case(showMessage, (state, payload) => ({ ...state, type: payload.type, text: payload.text }))
  .case(hideMessage, (state)          => ({ ...state, type: 'hidden', text: '' }));
