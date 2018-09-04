import { RootAction } from '@/renderer/actions';
import { ipcRenderer as ipc } from 'electron';
import { Middleware } from 'redux';

export default function errorsMiddleware (): Middleware {
  return () => (next) => (action: RootAction) => {
    if (/FAIL$/g.test(action.type)) {
      if (action.payload && action.payload.error) {
        ipc.send('show-error', action.payload.error);
      } else {
        ipc.send('show-error', 'An unexpected error occurred.');
      }
    }

    return next(action);
  };
}
