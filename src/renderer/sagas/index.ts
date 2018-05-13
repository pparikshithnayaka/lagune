import accountsSaga from '@/sagas/accounts';
import dbSaga from '@/sagas/db';
import loginSaga from '@/sagas/login';
import { all, fork } from 'redux-saga/effects';

export default function* rootSaga () {
  yield all([
    fork(loginSaga),
    fork(dbSaga),
    fork(accountsSaga),
  ]);
}
