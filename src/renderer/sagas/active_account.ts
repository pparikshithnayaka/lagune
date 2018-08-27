import {
  changeActiveAccount,
  changeActiveAccountProcess,
} from '@/actions/active_account';
import { SagaIterator } from 'redux-saga';
import client from '@/client';
import RootState from '@/reducers';
import { call, select, takeEvery } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';
import * as Lagune from '@@/typings/lagune';

const changeActiveAccountWorker = bindAsyncAction(changeActiveAccountProcess)(
  function* (index: number): SagaIterator {

    const activeAccount: Lagune.VerifiedAccount = yield select((state: RootState) => state.verified_account[index]);

    client.setUrl(activeAccount.url);
    client.setToken(activeAccount.access_token);
    client.setUrlVersion(activeAccount.url_version);
    client.setStreamingUrl(activeAccount.streaming_url);

    return index;
  }
)


export default function* activeAccountSaga () {
  yield takeEvery<Action<number>>(changeActiveAccount, ({ payload }) => changeActiveAccountWorker(payload));
}
