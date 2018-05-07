import Mastodon from '@lagunehq/core';
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('StatusList');

export const fetchHomeTimeline = actionCreator.async<
  {},
  Mastodon.Status[],
  Mastodon.Error
>('FETCH_HOME');

export const fetchCommunityTimeline = actionCreator.async<
  {},
  Mastodon.Status[],
  Mastodon.Error
>('FETCH_COMMUNITY');

export const fetchPublicTimeline = actionCreator.async<
  {},
  Mastodon.Status[],
  Mastodon.Error
>('FETCH_PUBLIC');

export const fetchTagTimeline = actionCreator.async<
  string,
  Mastodon.Status[],
  Mastodon.Error
>('FETCH_TAG');

export const fetchListTimeline = actionCreator.async<
  string,
  Mastodon.Status[],
  Mastodon.Error
>('FETCH_LIST');
