import {
  addVerifiedAccount,
  addVerifiedAccountProcess,
  fetchVerifiedAccounts,
  fetchVerifiedAccountsProcess,
} from '@/actions/verified_account';
import db, { VerifiedAccountsTable } from '@/db';
import * as Lagune from '@@/typings/lagune';
import { SagaIterator } from 'redux-saga';
import { call, takeEvery } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';

db.open();

const addVerifiedAccountWorker = bindAsyncAction(addVerifiedAccountProcess)(
  function* (account: Lagune.VerifiedAccount): SagaIterator {
    // Add new verified account to table
    yield call(db.verified_accounts.add, { ...account });

    // Fetching latest data
    const result: VerifiedAccountsTable[] = yield call(() => db.verified_accounts.toArray());
    return result;
  },
);

const fetchVerifiedAccountsWorker = bindAsyncAction(fetchVerifiedAccountsProcess)(
  function* ({}): SagaIterator {
    const result: VerifiedAccountsTable[] = yield call(() => db.verified_accounts.toArray());
    return result;
  },
);

export default function* dbSaga () {
  yield takeEvery<Action<Lagune.VerifiedAccount>>(addVerifiedAccount, ({ payload }) => addVerifiedAccountWorker(payload));
  yield takeEvery<Action<{}>>(fetchVerifiedAccounts, () => fetchVerifiedAccountsWorker({}) );
}
