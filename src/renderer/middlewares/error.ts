import { RootAction } from '@/renderer/actions';
import { ipcRenderer as ipc } from 'electron';
import { Middleware } from 'redux';

export default function errorsMiddleware () {
  return () => (next) => (action: RootAction) => {
    if (/FAILED$/g.test(action.type)) {
      const message = action.payload.toString() || 'An unexpected error occurred';
      const link = 'https://github.com/lagunehq/lagune/issues';

      ipc.send('show-message-box', {
        type: 'error',
        message: `Lagune: ${message}`,
        detail: `To report bug to developer, open issue on GitHub: ${link}`,
      });
    }

    return next(action);
  };
}
