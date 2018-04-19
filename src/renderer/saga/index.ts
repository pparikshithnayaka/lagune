import { all, fork } from 'redux-saga/effects';
// import { users } from '@/sagas/users';
// import { login } from '@/sagas/login';

export function* rootSaga () {
  yield all([
    // fork(users),
    // fork(login),
  ]);
}
