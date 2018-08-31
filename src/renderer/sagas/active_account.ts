import {
  changeActiveAccount,
  changeActiveAccountProcess,
} from '@/actions/active_account';
import client from '@/client';
import { RootState } from '@/reducers';
import { VerifiedAccount } from '@@/typings/lagune';
import { SagaIterator } from 'redux-saga';
import { put, select, takeEvery } from 'redux-saga/effects';

function* changeActiveAccountWorker (index: number): SagaIterator {
  yield put(changeActiveAccountProcess.started(index));

  try {
    const activeAccount: VerifiedAccount = yield select((state: RootState) => state.verified_accounts.get(index));
    client.setUrl(activeAccount.url);
    client.setToken(activeAccount.access_token);
    client.setStreamingUrl(activeAccount.streaming_url);
    yield put(changeActiveAccountProcess.done({ params: index, result: index }));
  } catch (error) {
    yield put(changeActiveAccountProcess.failed({ params: index, error }));
    throw error;
  }
}

export default function* activeAccountSaga () {
  yield takeEvery(changeActiveAccount, ({ payload }) => changeActiveAccountWorker(payload));
}
