import Mastodon from '@lagunehq/core';
import { shell } from 'electron';
import { call, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '@/reducers';
import { Action } from 'typescript-fsa';
import { SagaIterator } from 'redux-saga';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';
import {
  fetchLoginUrl,
  fetchLoginUrlProcess,
  verifyCode,
  verifyCodeProcess,
} from '@/actions/login';
import config from '@/config';

interface LaguneServerError {
  error: string;
}

interface LaguneUrl {
  url: string;
}

interface LaguneVerify {
  access_token: string;
  account: Mastodon.Credentials;
  instance: Mastodon.Instance;
}

const fetchUrlRequest = async (host: string) => {
  const response = await fetch(`${config.server_url}/oauth/url?host=${host}`);
  const result   = await response.json();

  if (response.ok) {
    return result as LaguneUrl;
  }

  throw result as LaguneServerError;
};

const verifyCodeRequest = async (host: string, code: string) => {
  const response = await fetch(`${config.server_url}/oauth/verify`, {
    method: 'POST',
    body: JSON.stringify({ host, code }),
    headers: { 'Content-Type': 'application/json' },
  });
  const result   = await response.json();

  if (response.ok) {
    return result as LaguneVerify;
  }

  throw result as LaguneServerError;
};

const fetchLoginUrlWorker = bindAsyncAction(fetchLoginUrlProcess)(
  function* (payload): SagaIterator {
    const { host } = payload;
    const result: LaguneUrl = yield call(fetchUrlRequest, host);

    // Open authorization page in default browser
    shell.openExternal(result.url);

    return result;
  },
);

const verifyCodeWorker = bindAsyncAction(verifyCodeProcess)(
  function* (payload): SagaIterator {
    const { code } = payload;
    const host: string = yield select((state: RootState) => state.login.host);
    const result: LaguneVerify = yield call(verifyCodeRequest, host, code);

    return result;
  },
);

export default function* loginSaga () {
  yield takeEvery<Action<{ host: string }>>(fetchLoginUrl, ({ payload }) => fetchLoginUrlWorker(payload));
  yield takeEvery<Action<{ code: string }>>(verifyCode,    ({ payload }) => verifyCodeWorker(payload));
}
