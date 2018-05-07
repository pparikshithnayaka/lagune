import {
  addVerifiedAccount,
  fetchVerifiedAccounts,
  fetchVerifiedAccountsProcess,
} from '@/actions/verified_account';
import * as AuthClient from '@/auth';
import db from '@/db';
import { SagaIterator } from 'redux-saga';
import { call, takeEvery } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';

db.open();

function* appendToList (payload: any) {
  yield db.table('verified_accounts').add(payload);
}

const fetchVerifiedAccountsWorker = bindAsyncAction(fetchVerifiedAccountsProcess)(
  function* ({}): SagaIterator {
    if ( db.verified_accounts !== undefined ) {
      const result = yield call(db.table('verified_accounts').toArray);
      return result;
    }

    return [];
  },
);

export default function* dbSaga () {
  yield takeEvery<Action<AuthClient.Credentials>>(addVerifiedAccount, ({ payload }) => appendToList(payload));
  yield takeEvery<Action<{}>>(fetchVerifiedAccounts, () => fetchVerifiedAccountsWorker({}));
}
