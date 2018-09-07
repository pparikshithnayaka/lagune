import { RootAction } from '@/renderer/actions';
import { ipcRenderer as ipc } from 'electron';
import { Middleware } from 'redux';

export default function errorsMiddleware (): Middleware {
  return () => (next) => (action: ReturnType<RootAction>) => {
    if (action.error && action.payload instanceof Error) {
      const message = action.payload.toString() || 'An unexpected error occurred';
      const link = 'https://github.com/lagunehq/lagune/issues';

      ipc.send('show-message-box', {
        type: 'error',
        message: `Lagune: ${message}`,
        detail: `To report bug to developer, open issue on GitHub: ${link}`,
      });

      /* tslint:disable no-console */
      console.error(action.payload);
      /* tslint:enable no-console */
    }

    return next(action);
  };
}
