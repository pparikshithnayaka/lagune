import { accountsSaga } from '@/renderer/sagas/accounts';
import { databaseSaga } from '@/renderer/sagas/database';
import { loginSaga } from '@/renderer/sagas/login';
import { all, fork } from 'redux-saga/effects';

export default function* rootSaga () {
  yield all([
    fork(loginSaga),
    fork(databaseSaga),
    fork(accountsSaga),
  ]);
}
