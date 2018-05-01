import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
  showMessage,
  hideMessage,
} from '@/actions/message';

export interface MessageState {
  /** Type of the message. this prop affects the color of message box */
  type: 'success'|'failure'|'hidden';

  /** Text of the message box */
  text: string;
}

const initialState: MessageState = {
  type: 'success',
  text: '',
};

export default reducerWithInitialState(initialState)
  .case(showMessage, (state, payload) => Object.assign({}, state, {
    type: payload.type,
    text: payload.text,
  }))
  .case(hideMessage, (state) => Object.assign({}, state, {
    type: 'hidden',
    text: '',
  }));
