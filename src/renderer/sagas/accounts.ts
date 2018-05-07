import {
  fetchAccount,
  fetchAccountProcess,
} from '@/actions/accounts';
import client from '@/client';
import { SagaIterator } from 'redux-saga';
import { call, takeEvery } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';

const fetchAccountWorker = bindAsyncAction(fetchAccountProcess)(
  function* (accountId): SagaIterator {
    const result = yield call(client.fetchAccount, accountId);
    return result;
  },
);

export default function* accountsSaga () {
  yield takeEvery<Action<string>>(fetchAccount, ({ payload }) => fetchAccountWorker(payload));
}
