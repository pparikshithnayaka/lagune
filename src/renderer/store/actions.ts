import * as Accounts from '@/renderer/features/accounts/actions';
import * as ActiveAccount from '@/renderer/features/activeAccount/actions';
import * as Database from '@/renderer/features/database/actions';
import * as Login from '@/renderer/features/login/actions';
import * as Message from '@/renderer/features/message/actions';
// import * as Timelines from '@/renderer/features/timelines/actions';

export type RootAction
  = typeof Accounts.fetchAccount
  | typeof Accounts.fetchAccountProcess.started
  | typeof Accounts.fetchAccountProcess.done
  | typeof Accounts.fetchAccountProcess.failed

  | typeof ActiveAccount.changeActiveAccount
  | typeof ActiveAccount.changeActiveAccountProcess.started
  | typeof ActiveAccount.changeActiveAccountProcess.done
  | typeof ActiveAccount.changeActiveAccountProcess.failed

  | typeof Database.addVerifiedAccount
  | typeof Database.addVerifiedAccountProcess.started
  | typeof Database.addVerifiedAccountProcess.done
  | typeof Database.addVerifiedAccountProcess.failed
  | typeof Database.fetchVerifiedAccounts
  | typeof Database.fetchVerifiedAccountsProcess.started
  | typeof Database.fetchVerifiedAccountsProcess.done
  | typeof Database.fetchVerifiedAccountsProcess.failed

  | typeof Login.fetchAuthorizationUrl
  | typeof Login.fetchAuthorizationUrlProcess.started
  | typeof Login.fetchAuthorizationUrlProcess.done
  | typeof Login.fetchAuthorizationUrlProcess.failed
  | typeof Login.verifyCode
  | typeof Login.verifyCodeProcess.started
  | typeof Login.verifyCodeProcess.done
  | typeof Login.verifyCodeProcess.failed

  | typeof Message.hideMessage
  | typeof Message.showMessage

  // | typeof Timelines.fetchHomeTimeline
  // | typeof Timelines.fetchCommunityTimeline
  // | typeof Timelines.fetchPublicTimeline
  // | typeof Timelines.fetchTagTimeline
  // | typeof Timelines.fetchListTimeline
;
