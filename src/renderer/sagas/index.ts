import { all, fork } from 'redux-saga/effects';
import loginSaga from '@/sagas/login';

export default function* rootSaga () {
  yield all([
    fork(loginSaga),
  ]);
}
