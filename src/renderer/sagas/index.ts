import { all, fork } from 'redux-saga/effects';
import loginSaga from '@/sagas/login';
import dbSaga from '@/sagas/db';

export default function* rootSaga () {
  yield all([
    fork(loginSaga),
    fork(dbSaga),
  ]);
}
