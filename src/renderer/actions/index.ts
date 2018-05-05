import * as Login from '@/actions/login';
import * as Message from '@/actions/message';

export type RootAction =
    typeof Login.fetchLoginUrl
  | typeof Login.fetchLoginUrlProcess.started
  | typeof Login.fetchLoginUrlProcess.done
  | typeof Login.fetchLoginUrlProcess.failed
  | typeof Login.verifyCode
  | typeof Login.verifyCodeProcess.started
  | typeof Login.verifyCodeProcess.done
  | typeof Login.verifyCodeProcess.failed
  | typeof Message.showMessage
  | typeof Message.hideMessage
;

