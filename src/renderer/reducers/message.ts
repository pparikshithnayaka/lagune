import { RootAction } from '@/actions';
import {
  hideMessage,
  showMessage,
} from '@/actions/message';
import { Record } from 'immutable';
import { isType } from 'typescript-fsa';

interface RecordProps {
  /** Type of the message. this prop affects the color of message box */
  type: 'success'|'hidden'|'failure';
  /** Text of the message box */
  text: string|null;
}

const defaultProps: RecordProps = {
  type: 'hidden',
  text: '',
};

export class MessageState extends Record(defaultProps) {}

function setMessage (state: MessageState, message: RecordProps): MessageState {
  return state.withMutations((map) => {
    map.set('type', message.type);
    map.set('text', message.text);
  });
}

function resetMessage (state: MessageState): MessageState {
  return state.withMutations((map) => {
    map.set('type', 'hidden');
    map.set('text', null);
  });
}

const initialState = new MessageState();

export default function message (state = initialState, action: RootAction) {
  if (isType(action, showMessage)) {
    return setMessage(state, action.payload);
  }

  if (isType(action, hideMessage)) {
    return resetMessage(state);
  }

  return state;
}
