import { call, takeEvery } from 'redux-saga/effects';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';
import { Action } from 'typescript-fsa';
import client from '@/client';
import { SagaIterator } from 'redux-saga';
import {
  fetchAccount,
  fetchAccountProcess,
} from '@/actions/accounts';

const fetchAccountWorker = bindAsyncAction(fetchAccountProcess)(
  function* (accountId): SagaIterator {
    const result = yield call(client.fetchAccount, accountId);
    return result;
  },
);

export default function* accountsSaga () {
  yield takeEvery<Action<string>>(fetchAccount, ({ payload }) => fetchAccountWorker(payload));
}
