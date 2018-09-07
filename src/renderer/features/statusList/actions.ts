import { Status } from '@lagunehq/core';
import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory('statusList');

export const fetchHomeTimeline      = actionCreator.async<void, Status[], Error>('FETCH_HOME');
export const fetchCommunityTimeline = actionCreator.async<void, Status[], Error>('FETCH_COMMUNITY');
export const fetchPublicTimeline    = actionCreator.async<void, Status[], Error>('FETCH_PUBLIC');
export const fetchTagTimeline       = actionCreator.async<string, Status[], Error>('FETCH_TAG');
export const fetchListTimeline      = actionCreator.async<string, Status[], Error>('FETCH_LIST');
