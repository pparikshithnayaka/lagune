import { accountsSaga } from '@/renderer/features/accounts/saga';
import { databaseSaga } from '@/renderer/features/database/saga';
import { loginSaga } from '@/renderer/features/login/saga';
import { all, fork } from 'redux-saga/effects';

export default function* rootSaga () {
  yield all([
    fork(loginSaga),
    fork(databaseSaga),
    fork(accountsSaga),
  ]);
}
