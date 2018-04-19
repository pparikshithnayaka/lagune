import { call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';
import { client } from '@/client';
import {
  fetchHomeTimeline,
  fetchCommunityTimeline,
  fetchPublicTimeline,
  fetchTagTimeline,
  fetchListTimeline,
} from '@/actions/status_list';

const fetchHomeTimelineWorker = bindAsyncAction(fetchHomeTimeline)(
  function* (): SagaIterator {
    const data = yield call(client.fetchHomeTimeline);

    return data;
  },
);
