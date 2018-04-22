import Mastodon from '@lagunehq/core';
import { shell } from 'electron';
import { call, takeLatest } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import { SagaIterator } from 'redux-saga';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';
import {
  fetchLoginUrl,
  fetchLoginUrlSubmit,
} from '@/actions/login';
import config from '@/config';

interface LaguneServerError {
  error: string;
}

interface LaguneUrl {
  url: string;
}

interface LaguneVerify {
  me: Mastodon.Credentials;
  token: string;
}

const fetchUrl = async (host: string) => {
  const response = await fetch(`${config.server_url}/oauth/url?host=${host}`);
  const result   = await response.json();

  if (response.ok) {
    return result as LaguneUrl;
  }

  throw result as LaguneServerError;
};

const verifyToken = async (host: string, code: string) => {
  const response = await fetch(`${config.server_url}/oauth/url`, {
    method: 'POST',
    body: JSON.stringify({ host, code }),
  });
  const result   = await response.json();

  if (response.ok) {
    return result as LaguneVerify;
  }

  throw result as LaguneServerError;
};


const fetchLoginUrlWorker = bindAsyncAction(fetchLoginUrl)(
  function* (payload): SagaIterator {
    const { host } = payload;
    const { url } = yield call(fetchUrl, host);

    shell.openExternal(url);

    return url;
  },
);

export default function* loginSaga () {
  yield takeLatest<Action<{ host: string }>>(fetchLoginUrlSubmit, (action) => fetchLoginUrlWorker(action.payload));
}
