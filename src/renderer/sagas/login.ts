import {
  fetchAuthorizationUrl,
  fetchAuthorizationUrlProcess,
  verifyCode,
  verifyCodeProcess,
} from '@/renderer/actions/login';
import {
  addVerifiedAccount,
} from '@/renderer/actions/verified_account';
import * as AuthClient from '@/renderer/auth';
import { RootState } from '@/renderer/reducers';
import { SagaIterator } from 'redux-saga';
import { call, put, select, takeEvery } from 'redux-saga/effects';

function* fetchAuthorizationUrlWorker (host: string): SagaIterator {
  yield put(fetchAuthorizationUrlProcess.started(host));

  try {
    const result: AuthClient.Url = yield call(AuthClient.fetchAuthorizationUrl, host);

    // Open authorization page in the default browser
    window.open(result.url);

    yield put(fetchAuthorizationUrlProcess.done({ params: host, result }));
  } catch (error) {
    yield put(fetchAuthorizationUrlProcess.failed(error));
  }
}

function* verifyCodeWorker (code: string): SagaIterator {
  yield put(verifyCodeProcess.started(code));

  try {
    const host: string = yield select((state: RootState) => state.login.host);
    const result: AuthClient.Credentials = yield call(AuthClient.verifyCode, host, code);

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
