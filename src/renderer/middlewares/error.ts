import { Middleware } from 'redux';
import { Action } from 'typescript-fsa';
import { showMessage } from '@/actions/message';
import Mastodon from '@lagunehq/core';

export default function errorsMiddleware (): Middleware {
  return ({ dispatch }) => (next) => (action) => {
    if (action.type) {
      if (/FAIL$/g.test(action.type)) {
        if (action.payload.error) {
          dispatch(showMessage({ type: 'failure', text: action.payload.error }));
        } else {
          dispatch(showMessage({ type: 'failure', text: 'An unexpected error occurred.' }));
        }
      }
    }

    return next(action);
  };
}
