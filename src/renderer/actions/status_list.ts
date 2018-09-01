import { Status } from '@lagunehq/core';
import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory('StatusList');

export const fetchHomeTimeline      = actionCreator.async<void, Status[]>('FETCH_HOME');
export const fetchCommunityTimeline = actionCreator.async<void, Status[]>('FETCH_COMMUNITY');
export const fetchPublicTimeline    = actionCreator.async<void, Status[]>('FETCH_PUBLIC');
export const fetchTagTimeline       = actionCreator.async<string, Status[]>('FETCH_TAG');
export const fetchListTimeline      = actionCreator.async<string, Status[]>('FETCH_LIST');
