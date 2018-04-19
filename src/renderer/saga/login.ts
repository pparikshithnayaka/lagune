import { fork, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';
import { fetchLoginUrl } from '@/actions/login';
import config from '@/config';

const fetchLoginUrlWorker = bindAsyncAction(fetchLoginUrl)(
  function* (params): SagaIterator {
    const { host } = params;
    const { url }: { url: string } = yield call(fetch, `https://${config.server_url}?host=${host}`);

    return url;
  },
);

function* fetchLoginWatcher () {
  while (true) {
    yield take(fetchLoginUrl.started);

    yield call(fetchLoginUrlWorker );
  }
}

export function* loginSaga () {
  yield fork(fetchLoginWatcher);
}
