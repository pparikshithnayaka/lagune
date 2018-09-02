import {
  addVerifiedAccount,
  addVerifiedAccountProcess,
  fetchVerifiedAccounts,
  fetchVerifiedAccountsProcess,
} from '@/renderer/actions/database';
import db, { VerifiedAccount } from '@/renderer/db';
import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';

db.open();

function* addVerifiedAccountWorker (account: VerifiedAccount): SagaIterator {
  yield put(addVerifiedAccountProcess.started(account));

  try {
    // Add new verified account to table
    yield call(db.verified_accounts.add, account);
    // Fetching latest data
    const result: VerifiedAccount[] = yield call(db.verified_accounts.toArray);
    yield put(addVerifiedAccountProcess.done({ params: account, result }));
  } catch (error) {
    yield put(addVerifiedAccountProcess.failed(error));
  }
}

function* fetchVerifiedAccountsWorker (): SagaIterator {
  yield put(fetchVerifiedAccountsProcess.started());

  try {
    const result: VerifiedAccount[] = yield call(db.verified_accounts.toArray);
    yield put(fetchVerifiedAccountsProcess.done({ result }));
  } catch (error) {
    yield put(fetchVerifiedAccountsProcess.failed(error));
  }
}

export function* databaseSaga () {
  yield takeEvery(addVerifiedAccount, ({ payload }) => addVerifiedAccountWorker(payload));
  yield takeEvery(fetchVerifiedAccounts, () => fetchVerifiedAccountsWorker());
}
