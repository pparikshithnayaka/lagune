import { client } from '@/renderer/client';
import {
  fetchAccount,
  fetchAccountProcess,
} from '@/renderer/features/accounts/actions';
import { Account } from '@lagunehq/core';
import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';

function* fetchAccountWorker (id: string): SagaIterator {
  yield put(fetchAccountProcess.started(id));

  try {
    const account: Account = yield call(() => client.fetchAccount(id));
    yield put(fetchAccountProcess.done({ params: id, result: account}));
  } catch (error) {
    yield put(fetchAccountProcess.failed(error));
  }
}

export function* accountsSaga () {
  yield takeEvery(fetchAccount, ({ payload }) => fetchAccountWorker(payload));
}
