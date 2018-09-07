import { client } from '@/renderer/client';
import {
  changeActiveAccount,
  changeActiveAccountProcess,
} from '@/renderer/features/activeAccount/actions';
import { RootState } from '@/renderer/store/reducers';
import { VerifiedAccount } from '@/renderer/utils/database/tables/verified_account';
import { SagaIterator } from 'redux-saga';
import { put, select, takeEvery } from 'redux-saga/effects';

function* changeActiveAccountWorker (index: number): SagaIterator {
  yield put(changeActiveAccountProcess.started(index));

  try {
    const activeAccount: VerifiedAccount = yield select((state: RootState) => state.getIn(['database', 'verified_accounts', index]));
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
