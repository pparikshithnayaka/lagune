import { Middleware } from 'redux';
import { ipcRenderer as ipc } from 'electron';

export default function errorsMiddleware (): Middleware {
  return () => (next) => (action) => {
    if (action.type) {
      if (/FAIL$/g.test(action.type)) {
        if (action.payload.error) {
          ipc.send('show-error', action.payload.error);
        } else {
          ipc.send('show-error', 'An unexpected error occurred.');
        }
      }
    }

    return next(action);
  };
}
