import {
  addVerifiedAccount,
} from '@/renderer/actions/database';
import {
  fetchAuthorizationUrl,
  fetchAuthorizationUrlProcess,
  verifyCode,
  verifyCodeProcess,
} from '@/renderer/actions/login';
import client from '@/renderer/client';
import { RootState } from '@/renderer/reducers';
import * as registerClient from '@/renderer/utils/registerClient';
import { Credentials, Instance } from '@lagunehq/core';
import { SagaIterator } from 'redux-saga';
import { call, put, select, takeEvery } from 'redux-saga/effects';

function* fetchAuthorizationUrlWorker (host: string): SagaIterator {
  yield put(fetchAuthorizationUrlProcess.started(host));

  try {
    const result: string = yield call(registerClient.fetchAuthorizationUrl, host);

    // Open authorization page in the default browser
    window.open(result);

    yield put(fetchAuthorizationUrlProcess.done({ params: host, result }));
  } catch (error) {
    yield put(fetchAuthorizationUrlProcess.failed(error));
  }
}

function* verifyCodeWorker (code: string): SagaIterator {
  yield put(verifyCodeProcess.started(code));

  try {
    const host: string = yield select((state: RootState) => state.login.host);
    const result: string = yield call(registerClient.verifyCode, host, code);

    client.setToken(result);

    const me: Credentials    = yield call(client.verfiyCredentials);
    const instance: Instance = yield call(client.fetchInstance);

    // call addVerifiedAccount to save to the DB
    yield put(addVerifiedAccount({
      access_token:  result,
      me:            me.id,
      url:           `https://${instance.uri}`,
      url_version:   '/api/v1',
      streaming_url: instance.urls.streaming_api,
    }));

    yield put(verifyCodeProcess.done({ params: code, result }));
  } catch (error) {
    yield put(verifyCodeProcess.failed(error));
  }
}

export function* loginSaga () {
  yield takeEvery(fetchAuthorizationUrl, ({ payload }) => fetchAuthorizationUrlWorker(payload));
  yield takeEvery(verifyCode,            ({ payload }) => verifyCodeWorker(payload));
}
