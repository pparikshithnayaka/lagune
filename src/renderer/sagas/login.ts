import { call, select } from 'redux-saga/effects';
import { takeEveryFsa } from '@/sagas/utils';
import { SagaIterator } from 'redux-saga';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';
import { RootState } from '@/reducers';
import {
  fetchLoginUrl,
  fetchLoginUrlProcess,
  verifyCode,
  verifyCodeProcess,
} from '@/actions/login';
import * as AuthClient from '@/auth';

const fetchLoginUrlWorker = bindAsyncAction(fetchLoginUrlProcess)(
  function* (payload): SagaIterator {
    const result: AuthClient.LaguneUrl = yield call(AuthClient.fetchUrlRequest, payload);

    window.open(result.url);

    return result;
  },
);

const verifyCodeWorker = bindAsyncAction(verifyCodeProcess)(
  function* (payload): SagaIterator {
    const host: string = yield select((state: RootState) => state.login.host);
    const result: AuthClient.LaguneVerify = yield call(AuthClient.verifyCodeRequest, host, payload);

    return result;
  },
);

export default function* loginSaga () {
  yield takeEveryFsa(fetchLoginUrl, ({ payload }) => fetchLoginUrlWorker(payload));
  yield takeEveryFsa(verifyCode,    ({ payload }) => verifyCodeWorker(payload));
}
