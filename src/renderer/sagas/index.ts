import accountsSaga from '@/renderer/sagas/accounts';
import dbSaga from '@/renderer/sagas/db';
import loginSaga from '@/renderer/sagas/login';
import { all, fork } from 'redux-saga/effects';

export default function* rootSaga () {
  yield all([
    fork(loginSaga),
    fork(dbSaga),
    fork(accountsSaga),
  ]);
}
