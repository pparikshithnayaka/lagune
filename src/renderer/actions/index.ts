import * as Login from '@/actions/login';
import * as Message from '@/actions/message';

export type RootAction =
    typeof Login.fetchAuthorizationUrl
  | typeof Login.fetchAuthorizationUrlProcess.started
  | typeof Login.fetchAuthorizationUrlProcess.done
  | typeof Login.fetchAuthorizationUrlProcess.failed
  | typeof Login.verifyCode
  | typeof Login.verifyCodeProcess.started
  | typeof Login.verifyCodeProcess.done
  | typeof Login.verifyCodeProcess.failed
  | typeof Message.showMessage
  | typeof Message.hideMessage
;

