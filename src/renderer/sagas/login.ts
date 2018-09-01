import {
  fetchAuthorizationUrl,
  fetchAuthorizationUrlProcess,
  verifyCode,
  verifyCodeProcess,
} from '@/renderer/actions/login';
import {
  addVerifiedAccount,
} from '@/renderer/actions/verified_account';
import { RootState } from '@/renderer/reducers';
import * as registerClient from '@/renderer/utils/registerClient';
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
    const result: registerClient.Credentials = yield call(registerClient.verifyCode, host, code);

    // call addVerifiedAccount to save to the DB
    yield put(addVerifiedAccount({
      access_token:  result.access_token,
      me:            result.account.id,
      url:           `https://${result.instance.uri}`,
      url_version:   '/api/v1',
      streaming_url: result.instance.urls.streaming_api,
    }));

    yield put(verifyCodeProcess.done({ params: code, result }));
  } catch (error) {
    yield put(verifyCodeProcess.failed(error));
  }
}

export default function* loginSaga () {
  yield takeEvery(fetchAuthorizationUrl, ({ payload }) => fetchAuthorizationUrlWorker(payload));
  yield takeEvery(verifyCode,            ({ payload }) => verifyCodeWorker(payload));
}
