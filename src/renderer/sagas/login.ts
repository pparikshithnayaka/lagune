import { call, select, takeEvery } from 'redux-saga/effects';
import { shell } from 'electron';
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
import * as AuthClient from '@/auth';

const fetchLoginUrlWorker = bindAsyncAction(fetchLoginUrlProcess)(
  function* (payload): SagaIterator {
    const { host } = payload;
    const result: AuthClient.LaguneUrl = yield call(AuthClient.fetchUrlRequest, host);

    // Open the authorization page in the default browser
    shell.openExternal(result.url);

    return result;
  },
);

const verifyCodeWorker = bindAsyncAction(verifyCodeProcess)(
  function* (payload): SagaIterator {
    const { code } = payload;
    const host: string = yield select((state: RootState) => state.login.host);
    const result: AuthClient.LaguneVerify = yield call(AuthClient.verifyCodeRequest, host, code);

    return result;
  },
);

export default function* loginSaga () {
  yield takeEvery<Action<{ host: string }>>(fetchLoginUrl, ({ payload }) => fetchLoginUrlWorker(payload));
  yield takeEvery<Action<{ code: string }>>(verifyCode,    ({ payload }) => verifyCodeWorker(payload));
}
