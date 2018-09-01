import {
  fetchCommunityTimeline,
  fetchHomeTimeline,
  fetchListTimeline,
  fetchPublicTimeline,
  fetchTagTimeline,
} from '@/renderer/actions/status_list';
import { client } from '@/renderer/client';
import { SagaIterator } from 'redux-saga';
import { call } from 'redux-saga/effects';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';

const fetchHomeTimelineWorker = bindAsyncAction(fetchHomeTimeline)(
  function* (): SagaIterator {
    const data = yield call(client.fetchHomeTimeline);

    return data;
  },
);
